import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-xl font-bold mb-6">Assignments Help</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard/orders" className="hover:bg-blue-600 p-2 rounded">📘 Order History</Link>
          <Link to="/dashboard/new-order" className="hover:bg-blue-600 p-2 rounded">📝 Create Order</Link>
          <Link to="/dashboard/support" className="hover:bg-blue-600 p-2 rounded">💬 Support</Link>
        </nav>
        <div className="mt-auto">
          <button onClick={logout} className="bg-red-600 w-full py-2 rounded mt-6">Logout</button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.name || "User"}
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
