import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";
import { FileText, FileArchive, FileImage, File } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p className="p-6">Loading...</p>;

  // Friendly 5-digit ID formatter
  const formatOrderId = (orderId) => {
    const numericId = parseInt(orderId.slice(-5), 16);
    return `#${numericId.toString().slice(-5)}`;
  };

  // Icon selector for files
  const getFileIcon = (url) => {
    if (!url) return <File className="w-6 h-6 text-gray-600" />;

    const ext = url.split(".").pop().toLowerCase();
    if (ext === "pdf") return <FileText className="w-6 h-6 text-red-600" />;
    if (["doc", "docx"].includes(ext))
      return <FileText className="w-6 h-6 text-blue-600" />;
    if (["zip", "rar"].includes(ext))
      return <FileArchive className="w-6 h-6 text-yellow-600" />;
    if (["png", "jpg", "jpeg"].includes(ext))
      return <FileImage className="w-6 h-6 text-green-600" />;

    return <File className="w-6 h-6 text-gray-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      
      {/* Back */}
      <Link to="/dashboard/orders" className="text-blue-600 underline">
        ← Back to Order History
      </Link>

      {/* Title */}
      <h2 className="text-2xl font-bold mt-4 mb-6">
        Order Details
        <span className="block text-sm text-gray-500">
          Order ID: {formatOrderId(order._id)}
        </span>
      </h2>

      <div className="space-y-4 text-gray-700">

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Assignment Type:</strong> {order.assignmentType}
          </p>

          <p>
            <strong>Course:</strong> {order.course}
          </p>

          <p>
            <strong>Pages:</strong> {order.pages}
          </p>

          <p>
            <strong>Deadline:</strong> {order.deadline}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="text-blue-600">{order.status}</span>
          </p>
        </div>

        {/* Instructions */}
        <div>
          <p className="font-semibold mb-1">Instructions:</p>
          <div
            className="bg-gray-50 border p-4 rounded prose max-w-full"
            dangerouslySetInnerHTML={{ __html: order.notes }}
          />
        </div>

        {/* Uploaded Files */}
        <div>
          <strong className="block mb-2">Uploaded Files:</strong>

          {!order.files?.length && (
            <p className="text-gray-500">No files uploaded.</p>
          )}

          <div className="space-y-3">
            {order.files?.map((file, index) => {
              const icon = getFileIcon(file.url);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-gray-700">File {index + 1}</span>
                  </div>

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                  >
                    Open
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Created At */}
        <p className="text-sm text-gray-500 pt-4">
          Created at: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
