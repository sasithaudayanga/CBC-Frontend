import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import UsersPage from "./admin/usersPage";
import OrdersPage from "./admin/ordersPage";
import ReviewsPage from "./admin/reviewsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import Header from "../components/header.jsx";
import UserEditPage from "./admin/userEditPage.jsx";
import SignupPage from "./signUp.jsx";

export default function AdminPage() {
  const location = useLocation();

  // Helper function to style active link
  const getLinkClass = (path) =>
    `px-6 py-3 text-lg font-medium rounded transition-all duration-200 ${
      location.pathname.includes(path)
        ? "bg-emerald-600 text-white"
        : "text-gray-800 hover:bg-emerald-100"
    }`;

  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex bg-gray-50">
        {/* Sidebar */}
        <div className="h-full w-[250px] shadow-lg flex flex-col bg-emerald-50 py-4 space-y-2">
          <Link to="/admin/products" className={getLinkClass("/products")}>
            Products
          </Link>
          <Link to="/admin/users" className={getLinkClass("/users")}>
            Users
          </Link>
          <Link to="/admin/orders" className={getLinkClass("/orders")}>
            Orders
          </Link>
          <Link to="/admin/review" className={getLinkClass("/review")}>
            Reviews
          </Link>
        </div>

        {/* Main Content */}
        <div className="h-full w-full p-6 overflow-y-auto bg-white shadow-inner rounded-tl-lg">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/review" element={<ReviewsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/user-edit" element={<UserEditPage />} />
             <Route path="/signup" element={<SignupPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
