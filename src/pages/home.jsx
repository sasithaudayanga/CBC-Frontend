import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import { HiH1 } from "react-icons/hi2";
import ClientProductPage from "./client/clientProductPage.jsx";
import ProductOverviewPage from "./client/productOverview.jsx";


export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col items-center ">
            <Header />
            <div className="w-full h-[calc(100vh-80px)]  flex flex-col items-center">
                <Routes path="/*">
                  <Route path="/" element={<h1>Home</h1>}/>
                  <Route path="/products" element={<ClientProductPage/>}/>
                  <Route path="/about" element={<h1>About Us</h1>}/>
                  <Route path="/contact" element={<h1>Contact</h1>}/>
                  <Route path="/*" element={<h1>404 Not Found</h1>}/>
                 <Route path="/overview/:id" element={<ProductOverviewPage/>}/>
                </Routes>
            </div>


        </div>
    )
}