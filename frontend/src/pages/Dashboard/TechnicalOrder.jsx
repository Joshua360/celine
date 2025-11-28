// frontend/src/pages/Dashboard/Technical.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { storage } from "../../appwrite";

export default function TechnicalOrder() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [form, setForm] = useState({
    instructions: "",
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Initialize Quill
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Describe your technical task here...",
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
        setForm((prev) => ({ ...prev, instructions: html }));
      });
    }
  }, []);

  // Upload files to Appwrite
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

  // Submit Quote Request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        taskType: "technical",
        instructions: form.instructions,
        files: uploadedFiles,
      };

      await API.post("/api/orders/request-quote", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Technical quote request submitted!");
    } catch (error) {
      console.error(error);
      setMessage("Submission failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Technical Task Request</h2>

        {/* Link to Writing Orders */}
        <button
          onClick={() => navigate("/dashboard/new-order")}
          className="inline-flex items-center gap-2 rounded-md border border-blue-600 text-blue-600 px-3 py-2 hover:bg-blue-50"
          type="button"
        >
          Writing Orders?
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Instructions with Quill */}
        <div>
          <label className="block font-semibold">Task Instructions</label>
          <div
            ref={editorRef}
            style={{
              height: "300px",
              marginBottom: "40px",
              backgroundColor: "white",
            }}
            className="border rounded"
          />
        </div>

        {/* File Attachment */}
        <div>
          <label>Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Request Quote
        </button>

        {message && (
          <p className="text-green-600 pt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
