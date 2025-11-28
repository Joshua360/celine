import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import OrderHistory from "./pages/Dashboard/OrderHistory";
import CreateOrder from "./pages/Dashboard/CreateOrder";
import Support from "./pages/Dashboard/Support";
import TechnicalOrder from "./pages/Dashboard/TechnicalOrder";
import Landing from "./pages/Landing";
import OrderDetails from "./pages/Dashboard/OrderDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="orders" element={<OrderHistory />} />
          <Route path="new-order" element={<CreateOrder />} />
          <Route path="support" element={<Support />} />
          <Route path="technical" element={<TechnicalOrder />} />  {/* NEW */}
          <Route path="/dashboard/order/:id" element={<OrderDetails />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
