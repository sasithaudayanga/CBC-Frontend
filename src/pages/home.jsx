import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ClientProductPage from "./client/clientProductPage.jsx";
import ProductOverviewPage from "./client/productOverview.jsx";
import ClientCartPage from "./client/clientCart.jsx";
import CheckoutPage from "./client/checkout.jsx";
import SearchProductPage from "./client/searchProduct.jsx";
import Homepage from "./homepage.jsx";
import AboutUspage from "./aboutus.jsx";
import Contact from "./contactPge.jsx";
import ReviewList from "./review.jsx";




export default function HomePage() {
    return (
        <div className="w-full h-screen overflow-hidden flex flex-col items-center ">
            <Header />
            <div className="w-full h-[calc(100vh-80px)]  flex flex-col items-center">
                <Routes path="/*">
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/products" element={<ClientProductPage/>}/>
                  <Route path="/about" element={<AboutUspage/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/*" element={<h1>404 Not Found</h1>}/>
                  <Route path="/cart" element={<ClientCartPage/>}/>
                  <Route path="/search" element={<SearchProductPage/>}/>
                  <Route path="/checkout" element={<CheckoutPage/>}/>
                  <Route path="/overview/:id" element={<ProductOverviewPage/>}/>
                </Routes>
            </div>


        </div>
    )
}