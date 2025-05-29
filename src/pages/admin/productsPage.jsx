import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                setProducts(res.data);
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    function deleteProduct(productId) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login First");
            return;
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            toast.success(response.data.message);
            setIsLoading(true);
        }).catch((e) => {
            toast.error(e.response.data.message);
        });
    }

    return (
        <div className="relative w-full h-full max-h-full overflow-y-auto flex flex-col px-4 py-6 bg-gray-50">


            {/* Add Product Button */}
            <div className="flex justify-end mb-4">
                <Link
                    to="/admin/add-product"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow transition-all duration-200"
                >
                    Add Product
                </Link>
            </div>

            {/* Loading Spinner */}
            {isLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-16 h-16 border-8 border-t-red-600 border-gray-300 rounded-full animate-spin" />
                </div>
            ) : (
                <div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            Product Management
                        </h2>
                    </div>
                    <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-gray-300 text-gray-800 text-base">
                                    <th className="px-4 py-2 border border-white text-left">Product ID</th>
                                    <th className="px-4 py-2 border border-white text-left">Product Name</th>
                                    <th className="px-4 py-2 border border-white text-center">Image</th>
                                    <th className="px-4 py-2 border border-white text-right">Labelled Price</th>
                                    <th className="px-4 py-2 border border-white text-right">Price</th>
                                    <th className="px-4 py-2 border border-white text-right">Stock</th>
                                    <th className="px-4 py-2 border border-white text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-200 transition-all duration-150"
                                    >
                                        <td className="px-4 py-2 border border-white shadow">{item.productId}</td>
                                        <td className="px-4 py-2 border border-white shadow">{item.productName}</td>
                                        <td className="px-4 py-2 border border-white shadow text-center">
                                            <img
                                                src={item.images[0]}
                                                alt={item.productName}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow text-right">
                                            LKR {item.labelledPrice.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow text-right">
                                            LKR {item.price.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow text-right">
                                            {item.stock}
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow text-center">
                                            <div className="flex items-center justify-center space-x-4">
                                                <div className="relative group">
                                                    <VscTrash
                                                        onClick={() => deleteProduct(item.productId)}
                                                        className="text-red-600 text-lg cursor-pointer hover:scale-110 transition"

                                                    />
                                                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">
                                                        Delete
                                                    </span>
                                                </div>

                                                <div className="relative group">
                                                    <FaRegEdit
                                                        onClick={() =>
                                                            navigate("/admin/edit-product", {
                                                                state: item,
                                                            })
                                                        }
                                                        className="text-green-600 text-lg cursor-pointer hover:scale-110 transition"

                                                    />
                                                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">
                                                        Edit
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            }
        </div>
    );
}
