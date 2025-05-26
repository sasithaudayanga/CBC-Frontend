import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { VscTrash } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
    const [user, setUser] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (isloading) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                headers: 
                     { Authorization: "Bearer " + token },
                }
            ).then((res) => {
                setUser(res.data);
                setIsloading(false);
            });
        }
    }, [isloading]);

    function deleteUser(_id) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login First");
            return;
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/users/" + _id, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        }).then((response) => {
            toast.success(response.data.message);
            setIsloading(true);
        }).catch((e) => {
            toast.error(e.response.data.message);
        });
    }

    return (
        <div className="relative w-full h-full max-h-full overflow-y-auto flex flex-col px-4 py-6 bg-gray-50">
            {/* Loading Spinner */}
            {isloading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-16 h-16 border-8 border-t-red-600 border-gray-300 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-300 text-gray-800 text-base">
                                <th className="px-4 py-2 border border-white text-left">Name</th>
                                <th className="px-4 py-2 border border-white text-left">Email</th>
                                <th className="px-4 py-2 border border-white text-center">Role</th>
                                <th className="px-4 py-2 border border-white text-center">Status</th>
                                <th className="px-4 py-2 border border-white text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100 transition-all duration-150"
                                >
                                    <td className="px-4 py-2 border border-white bg-gray-200">{item.firstName+" "+ item.lastName}</td>
                                    <td className="px-4 py-2 border border-white bg-gray-200">{item.email}</td>
                                    <td className="px-4 py-2 border border-white bg-gray-200 text-center">{item.role}</td>
                                    <td className="px-4 py-2 border border-white bg-gray-200 text-center">
                                        {item.isBlocked ? "Blocked" : "Active"}
                                    </td>
                                    <td className="px-4 py-2 border border-white bg-gray-200 text-center">
                                        <div className="flex items-center justify-center space-x-4">
                                            <div className="relative group">
                                                <VscTrash onClick={()=>{deleteUser(item._id)}} className="text-red-600 text-lg cursor-pointer hover:scale-110 transition" />
                                                <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-black opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-sm">
                                                    Delete
                                                </span>
                                            </div>

                                            <div className="relative group">
                                                <FaRegEdit onClick={() =>
                                                        navigate("/admin/user-edit", {
                                                            state: item,
                                                        })
                                                    } className="text-green-600 text-lg cursor-pointer hover:scale-110 transition" />
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
            )}
        </div>
    );
}
