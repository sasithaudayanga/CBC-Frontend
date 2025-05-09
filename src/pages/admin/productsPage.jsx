import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";


export default function ProductsPage() {

    const [products, setProducts] = useState([])
    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                console.log(res.data)
                setProducts(res.data)

            })
        }, []
    );



    return (
        <div className="relative w-full h-full max-h-full overflow-y-scroll flex flex-col pl-[10px] pr-[50px] ">
            <table className="w-full text-center mt-[10px]">
                <thead >
                    <tr className="text-center">
                        <th className=" bg-gray-400 border border-white">Product Id</th>
                        <th className="  bg-gray-400 border border-white">Product Name</th>
                        <th className="border border-white bg-gray-400">Product Image</th>
                        <th className=" border border-white bg-gray-400">Labelled Price</th>
                        <th className=" border border-white  bg-gray-400">Price</th>
                        <th className=" border border-white bg-gray-400">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => {
                        return (

                            <tr key={index}>
                                <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.productId}</td>
                                <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.productName}</td>
                                <td className="text-left pl-[10px] pr-[10px] bg-gray-200 border border-white">image</td>
                                <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.labelledPrice}</td>
                                <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.price}</td>
                                <td className="text-right pl-[10px] pr-[10px] bg-gray-200 border border-white">{item.stock}</td>
                            </tr>


                        )
                    })}
                </tbody>
            </table>
            <Link to="/admin/add-product" className="bg-green-700 text-white w-[100px] h-[30px] rounded-[5px] 
            cursor-pointer absolute text-center bottom-5">Add Product</Link>

        </div>

    )
}