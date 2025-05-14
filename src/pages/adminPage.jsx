import { Link, Route, Routes } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import UsersPage from "./admin/usersPage";
import OrdersPage from "./admin/ordersPage";
import ReviewsPage from "./admin/reviewsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";


export default function AdminPage(){
    return(
        <div className="w-full h-screen flex ">
            <div className="h-full w-[250px] shadow flex flex-col  bg-green-200 ">

                <Link className="mx-[20px]" to ="/admin/products">Products</Link>
                <Link className="mx-[20px]" to ="/admin/users">Users</Link>
                <Link className="mx-[20px]" to ="/admin/orders">Orders</Link>
                <Link className="mx-[20px]" to ="/admin/review">Reviews</Link>
               
            </div>
            
            <div className="h-full w-[calc(100%-250px)] shadow ">
                <Routes path="/*">
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/review" element={<ReviewsPage/>}/>
                    <Route path="/add-product" element={<AddProductPage/>}/>
                    <Route path="/edit-product" element={<EditProductPage/>}/>
                </Routes>
            </div>
        </div>
    )
}