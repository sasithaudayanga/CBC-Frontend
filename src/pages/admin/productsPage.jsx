import { useEffect, useState } from "react"
import axios from "axios"


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
        <div className="w-full h-full max-h-full overflow-y-scroll flex flex-col pl-[10px] pr-[50px] mt-[10px]">
            <table className="w-full text-center">
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

        </div>

    )
}