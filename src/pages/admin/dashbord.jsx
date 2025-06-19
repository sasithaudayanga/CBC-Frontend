import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const[reviewCount,setReviewCount]=useState(0);
    const[userCount,setUserCount]=useState(0);


    useEffect(() => {
        if (isLoading) {
            const token=localStorage.getItem("token");

            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res1) => {
                setProductCount(res1.data.length);
                //console.log(res1.data.length);
            });

            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders",{
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((res2)=>{
                setOrderCount(res2.data.length);
                //console.log(res2.data.length);
            });

            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/review",{
                headers:{
                    Authorization: "Bearer " + token
                }
            }).then((res3)=>{
                setReviewCount(res3.data.length);
                 //  console.log(res3.data);

            });

            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users",{
              headers:{
                    Authorization: "Bearer " + token
                }

            }).then((res4)=>{
                setUserCount(res4.data.length);
                setIsLoading(false);
              // console.log(res4);

            });


        }
    }, [isLoading]);

    





    return (
    <>
      <div className="  py-10 px-4 sm:px-10">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-10">
          Admin Dashboard Summary
        </h1>

        <div className="grid grid-cols-1 flex-wrap   md:grid-cols-3 gap-6 justify-center items-center">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border-t-4 border-orange-500 hover:scale-105 transition-transform duration-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h2>
            <p className="text-4xl font-bold text-orange-500">{productCount}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border-t-4 border-blue-500 hover:scale-105 transition-transform duration-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h2>
            <p className="text-4xl font-bold text-blue-500">{orderCount}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border-t-4 border-green-500 hover:scale-105 transition-transform duration-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Reviews</h2>
            <p className="text-4xl font-bold text-green-500">{reviewCount}</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border-t-4 border-purple-500 hover:scale-105 transition-transform duration-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-purple-500">{userCount}</p>
          </div>

        </div>
      </div>
    </>
  );
}