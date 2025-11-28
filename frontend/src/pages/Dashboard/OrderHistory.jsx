import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/api/orders/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    };
    fetchData();
  }, []);

  // Numeric 5-digit user-friendly ID
  const formatOrderId = (orderId) => {
    const numericId = parseInt(orderId.slice(-5), 16);
    return `#${numericId.toString().slice(-5)}`;
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Order ID</th>
            <th className="p-3 border">Deadline</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b hover:bg-gray-50">
              <td className="p-3 border text-blue-600 underline">
                <Link to={`/dashboard/order/${o._id}`}>
                  {formatOrderId(o._id)}
                </Link>
              </td>

              <td className="p-3 border">{o.deadline}</td>

              <td className="p-3 border text-blue-600">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
