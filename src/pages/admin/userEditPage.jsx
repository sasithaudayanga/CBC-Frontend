import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserEditPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(location.state.email);
    const [firstName, setFirstname] = useState(location.state.firstName);
    const [lastName, setLastname] = useState(location.state.lastName);
    const [role, setRole] = useState(location.state.role);
    const [isBlocked, setIsBlocked] = useState(Boolean(location.state.isBlocked));
    const [id] = useState(location.state._id);

    async function Updateuser(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        try {
            const userdata = {
                email,
                firstName,
                lastName,
                role,
                isBlocked,
                id,
            };

            const response = await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/users/" + id, userdata, {
                headers: { Authorization: "Bearer " + token },
            });

            toast.success(response.data.message);
            navigate("/admin/users");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update product");
        }
    }

    return (
        <div className="overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-4 py-6">
            <form
                onSubmit={Updateuser}
                className="w-[650px] overflow-y-auto h-[500px] bg-white shadow-2xl rounded-2xl p-10 space-y-2 transition-all duration-300"
            >
                <div className="text-center w-full h-[60px] flex flex-col justify-center items-center rounded-2xl pt-3 pb-3 gap-0 bg-emerald-700">
                    <h2 className="text-3xl font-bold text-white mb-2">Edit User</h2>

                </div>
                <div className="flex justify-center">
                    <p className="text-gray-800">Update the user details below</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>

                    <div className="flex items-center pt-2">
                        <input
                            type="checkbox"
                            id="isBlocked"
                            checked={isBlocked}
                            onChange={(e) => setIsBlocked(e.target.checked)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isBlocked" className="ml-3 text-sm font-medium text-gray-700">
                            Blocked
                        </label>
                    </div>
                </div>

                <div className=" pt-4 border-t border-gray-200 flex justify-center items-center">
                    <button
                        type="submit"
                        className="w-[50%] bg-emerald-700 hover:bg-emerald-800 cursor-pointer hover:scale-110 text-white text-lg font-semibold py-3 rounded-lg transition duration-300 shadow-md"
                    >
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
}
