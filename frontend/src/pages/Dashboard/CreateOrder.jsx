// frontend/src/pages/Dashboard/CreateOrder.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { storage } from "../../appwrite";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [form, setForm] = useState({
    assignmentType: "",
    course: "",
    pages: 1,
    deadline: "",
    notes: "",
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Provide detailed instructions...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setForm((prev) => ({ ...prev, notes: html }));
      });
    }
  }, []);

  // Compute price
  const calculatePrice = () => {
    const base = 10;
    const multi =
      form.deadline === "12hrs"
        ? 2
        : form.deadline === "1day"
        ? 1.8
        : 1;

    return Number(form.pages || 1) * base * multi;
  };

  // Upload to Appwrite
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploaded = [];

    for (const file of files) {
      try {
        const result = await storage.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET_ID,
          "unique()",
          file
        );

        const url = storage
          .getFileView(
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            result.$id
          )
          .toString();

        uploaded.push({ id: result.$id, url });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploadedFiles(uploaded);
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        assignmentType: form.assignmentType,
        course: form.course,
        pages: form.pages,
        deadline: form.deadline,
        notes: form.notes,
        price: calculatePrice(),
        files: uploadedFiles,
      };

      await API.post("/api/orders/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Order created successfully!");
      navigate("/dashboard/orders");
    } catch (error) {
      console.error(error);
      setMessage("Submission failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Create New Order (Writing)</h2>

        <button
          onClick={() => navigate("/dashboard/technical")}
          className="inline-flex items-center gap-2 rounded-md border border-blue-600 text-blue-600 px-3 py-2 hover:bg-blue-50"
          type="button"
        >
          Technical Orders?
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Assignment Type (DROPDOWN) */}
        <div>
          <label>Assignment Type</label>
          <select
            className="border p-2 w-full rounded"
            value={form.assignmentType}
            onChange={(e) =>
              setForm({ ...form, assignmentType: e.target.value })
            }
          >
            <option value="">Select assignment type</option>
            <option value="Essay">Essay</option>
            <option value="Research Paper">Research Paper</option>
            <option value="Case Study">Case Study</option>
            <option value="Report">Report</option>
            <option value="Review">Review</option>
            <option value="Reflection Paper">Reflection Paper</option>
            <option value="Discussion Post">Discussion Post</option>
            <option value="Proposal">Proposal</option>
          </select>
        </div>

        {/* Course (DROPDOWN) */}
        <div>
          <label>Course</label>
          <select
            className="border p-2 w-full rounded"
            value={form.course}
            onChange={(e) =>
              setForm({ ...form, course: e.target.value })
            }
          >
            <option value="">Select course</option>
            <option value="Business">Business</option>
            <option value="Nursing">Nursing</option>
            <option value="Psychology">Psychology</option>
            <option value="Sociology">Sociology</option>
            <option value="Education">Education</option>
            <option value="Law">Law</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        {/* Pages + Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Pages</label>
            <input
              type="number"
              min="1"
              className="border p-2 w-full rounded"
              value={form.pages}
              onChange={(e) =>
                setForm({ ...form, pages: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label>Deadline</label>
            <select
              className="border p-2 w-full rounded"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            >
              <option value="">Select</option>
              <option value="12hrs">12 Hours</option>
              <option value="1day">1 Day</option>
              <option value="2days">2 Days</option>
              <option value="3days">3 Days</option>
              <option value="5days">5 Days</option>
              <option value="7days">7 Days</option>
              <option value="2wks">2 Weeks</option>
            </select>
          </div>
        </div>

        {/* Instructions (Quill) */}
        <div>
          <label>Instructions</label>
          <div
            ref={editorRef}
            style={{ height: "300px", backgroundColor: "white", marginBottom: "40px" }}
            className="border rounded"
          />
        </div>

        {/* Files */}
        <div>
          <label>Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Price */}
        <div className="bg-gray-50 border p-3 rounded">
          Total Price:{" "}
          <span className="text-blue-600 font-bold">
            ${calculatePrice().toFixed(2)}
          </span>
        </div>

        <button className="bg-blue-600 text-white p-2 rounded">
          Submit Order
        </button>

        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
}
