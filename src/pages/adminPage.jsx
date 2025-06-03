import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import UsersPage from "./admin/usersPage";
import ReviewsPage from "./admin/reviewsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import Header from "../components/header.jsx";
import UserEditPage from "./admin/userEditPage.jsx";
import SignupPage from "./signUp.jsx";
import OrdersPage from "./admin/adminOrdersPage.jsx";

export default function AdminPage() {
  const location = useLocation();
  const path=location.pathname;

  function getClass(name){
    if(path.includes(name)){
      return "px-7 py-1 text-lg font-medium rounded-l-full transition-all duration-200 bg-emerald-600 text-white"
    }else{
      return "text-gray-800 hover:bg-emerald-200 px-4 rounded-l-full "
    }

  }

  
   return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex bg-gray-50">
        {/* Sidebar */}
        <div className="h-full w-[250px] shadow-lg border px-0 border-emerald-100 flex flex-col bg-emerald-50 py-4 space-y-2">
          <Link to="/admin/products" className={getClass("/products")}>
            Products
          </Link>
          <Link to="/admin/users" className={getClass("/users")}>
            Users
          </Link>
          <Link to="/admin/orders" className={getClass("/orders")}>
            Orders
          </Link>
          <Link to="/admin/review" className={getClass("/review")}>
            Reviews
          </Link>
        </div>

        {/* Main Content */}
        <div className="h-full w-full  border-2 border-emerald-50  bg-white shadow-inner rounded-tl-lg">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<OrdersPage/>} />
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
