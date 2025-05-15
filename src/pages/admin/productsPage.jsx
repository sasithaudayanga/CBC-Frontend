import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";


export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(
        () => {
            if (isLoading == true) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);

                });
            }

        }, [isLoading]
    );

    function deleteProduct(productId) {
        const token = localStorage.getItem('token');
        if (token == null) {
            toast.error("Please Logn First")
            return
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            toast.success(response.data.message)
            navigate("/admin/products")
            setIsLoading(true)

        }).catch((e) => {
            toast.error(e.response.data.message)
        })



    }



    return (
        <div className="relative w-full h-full max-h-full overflow-y-scroll flex flex-col pl-[10px] pr-[50px]  ">

            <Link to="/admin/add-product" className="bg-green-700 text-white w-[100px] h-[30px] rounded-[5px] 
                      cursor-pointer absolute text-center bottom-12">
                Add Product
            </Link>

            {isLoading ?
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[70px] h-[70px] border-[8px] border-t-red-800 rounded-full border-gray-300 animate-spin">

                </div>

            </div>:
            
                <table className="w-full text-center mt-[10px]">
                    <thead >
                        <tr className="text-center">
                            <th className=" bg-gray-400 border border-white">Product Id</th>
                            <th className="  bg-gray-400 border border-white">Product Name</th>
                            <th className="border border-white bg-gray-400 w-[100px]">Product Image</th>
                            <th className=" border border-white bg-gray-400">Labelled Price</th>
                            <th className=" border border-white  bg-gray-400">Price</th>
                            <th className=" border border-white bg-gray-400">Stock</th>
                            <th className=" border border-white bg-gray-400">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(
                            (item, index) => {
                                return (

                                    <tr key={index}>
                                        <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.productId}</td>
                                        <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.productName}</td>
                                        <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white flex justify-center items-center w-[100px]" ><img src={item.images[0]} className="w-[50px] h-[50px] m-[2px]" /></td>
                                        <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.labelledPrice}</td>
                                        <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.price}</td>
                                        <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.stock}</td>
                                        <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">
                                            <div className="flex justify-center items-center w-full mx-0">
                                                <div className=" flex justify-center items-center w-[50%] mx-0">
                                                    <VscTrash onClick={() => {
                                                        deleteProduct(item.productId)
                                                    }} className="text-red-600 text-[20px] cursor-pointer " />
                                                </div>
                                                <div className="flex justify-center items-center w-[50%] mx-0">
                                                    <FaRegEdit onClick={
                                                        () => {
                                                            navigate("/admin/edit-product",
                                                                {
                                                                    state: item
                                                                })
                                                        }
                                                    } className="text-green-600 text-[20px] cursor-pointer " />
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>

                </table>

                
            }





        </div>

    )
}