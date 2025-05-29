import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";

export default function ReviewsPage() {
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {

        if (isLoading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/review", {
                headers: { Authorization: "Bearer " + token }
            }).then((response) => {
                setReview(response.data);

                setIsLoading(false);
                
            });
        }
    }, [isLoading]);

    function deleteReview(_id) {

        if (!token) {
            toast.error("Please Login First");
            return;
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/review/" +_id, {
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
            {/* Page Heading */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                    Customer Review Management
                </h2>
            </div>

            {/* Loading Spinner */}
            {isLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-16 h-16 border-8 border-t-red-600 border-gray-300 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-300 text-gray-800 text-base">
                                <th className="px-4 py-2 border border-white text-left">Product ID</th>
                                <th className="px-4 py-2 border border-white text-left">Product Name</th>
                                <th className="px-4 py-2 border border-white text-left">User Name</th>
                                <th className="px-4 py-2 border border-white text-left">Comment</th>
                                <th className="px-4 py-2 border border-white text-center">Rating</th>
                                <th className="px-4 py-2 border border-white text-center">Date</th>
                                <th className="px-4 py-2 border border-white text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {review.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition-all duration-150">
                                    <td className="px-4 py-2 border border-white shadow">{item.productId}</td>
                                    <td className="px-4 py-2 border border-white shadow">{item.productName}</td>
                                    <td className="px-4 py-2 border border-white shadow">{item.userName || "N/A"}</td>
                                    <td className="px-4 py-2 border border-white shadow">{item.comment}</td>
                                    <td className="px-4 py-2 border border-white shadow text-center">{item.rating}</td>
                                    <td className="px-4 py-2 border border-white shadow text-center">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 border border-white shadow text-center">
                                        <div className="flex items-center justify-center space-x-4">
                                            <div className="relative group">
                                                <VscTrash
                                                    onClick={() => deleteReview(item._id)}
                                                    className="text-red-600 text-lg cursor-pointer hover:scale-110 transition"
                                                />
                                                <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
