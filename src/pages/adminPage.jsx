import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import UsersPage from "./admin/usersPage";
import ReviewsPage from "./admin/reviewsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import Header from "../components/header.jsx";
import UserEditPage from "./admin/userEditPage.jsx";
import SignupPage from "./signUp.jsx";
import OrdersPage from "./admin/adminOrdersPage.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading.jsx";
import DashboardPage from "./admin/dashbord.jsx";


export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [adminSideBar, setAdminSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");//success ,reject
  
  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token || token === "") {
      setStatus("reject");
      navigate("/login");

    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/authuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.role !== "admin") {
          setStatus("reject");
          toast.error("You are not authorized to access this page")
          navigate("/");
        } else {
          setStatus("success");

        }
      }).catch((err) => {
        console.error(err);
        setStatus("reject");
        toast.error("You are not authenticated. Please login first.")
        navigate("/login");

      })
    }

  }, [status])

  function getClass(name) {
    if (path.includes(name)) {
      return "px-7 py-1 text-lg font-medium rounded-l-full transition-all duration-200 bg-emerald-600 text-white"
    } else {
      return "text-gray-800 hover:bg-emerald-200 px-4 rounded-l-full "
    }

  }

  
  return (
    <>
      <Header />

      {status === "loading"||status === "reject" ?
        <Loading /> :

        <>
          <div className="relative w-full h-[calc(100vh-80px)] flex bg-gray-50">

            {/* Sidebar */}
            <div className="hidden lg:flex h-full w-[250px] shadow-lg border px-0 border-emerald-100 flex-col bg-emerald-50 py-4 space-y-2">
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
            <div className="  h-full w-full  border-2 border-emerald-50 shadow-inner rounded-tl-lg">
              
              {/*Admin side bar */}
              <div className="lg:hidden">
                <button onClick={() => setAdminSideBar(true)} className=" text-[20px] font-bold">Menu</button>
              </div>

              <Routes>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/" element={<DashboardPage/>} />
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
          {/* Admin Sidebar */}
          {adminSideBar && (
            <div className="fixed inset-0 z-50 flex w-full h-screen bg-[#00000060] md:hidden">
              <div className="w-[60%] bg-white h-full relative z-50">
                {/* Sidebar Header */}
                <div className="relative w-full h-[80px] shadow-2xl flex items-center bg-white justify-center">

                  <img
                    onClick={() => {
                      setAdminSideBar(false);
                      navigate("/admin/products");
                    }}
                    src="/homelogo.png"
                    alt="logo"
                    className="w-[80px] h-[80px] cursor-pointer hover:scale-105 transition-transform duration-200"
                  />

                </div>

                {/* Sidebar Links */}
                <div className="w-full h-[calc(100%-80px)] bg-emerald-100 flex flex-col items-center gap-4 pt-6">
                  <Link to="/admin/products" onClick={() => setAdminSideBar(false)} className="text-[20px] font-medium text-gray-800">Products</Link>
                  <Link to="/admin/users" onClick={() => setAdminSideBar(false)} className="text-[20px] font-medium text-gray-800">Users</Link>
                  <Link to="/admin/orders" onClick={() => setAdminSideBar(false)} className="text-[20px] font-medium text-gray-800">Orders</Link>
                  <Link to="/admin/review" onClick={() => setAdminSideBar(false)} className="text-[20px] font-medium text-gray-800">Reviews</Link>

                </div>
              </div>
            </div>
          )}
        </>
      }
    </>
  );


}
