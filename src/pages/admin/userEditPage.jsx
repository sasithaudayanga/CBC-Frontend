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
    const [isBlocked, setIsBlocked] = useState(location.state.isBlocked);
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
                isBlocked: isBlocked,
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
            <form
                onSubmit={Updateuser}
                className="w-full max-w-lg bg-white shadow-xl rounded-xl p-10 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Edit User</h2>

                <div>
                    <label className="text-gray-600 font-medium">User ID :{" "+id} </label>
                    
                </div>

                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                        readOnly
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="isBlocked" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="isBlocked"
                        value={isBlocked.toString()}
                        onChange={(e) => setIsBlocked(e.target.value === "true")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="false">Active</option>
                        <option value="true">Blocked</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-200"
                >
                    Update User
                </button>
            </form>
        </div>
    );
}
