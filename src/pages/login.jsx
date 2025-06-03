import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users/login",
                { email, password }
            );

            toast.success(response.data.message);
            localStorage.setItem("token", response.data.token);

            if (response.data.role === "admin") {
                navigate("/admin/products");
            } else {
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="w-full bg-[url('/loginbg.jpg')] bg-center bg-cover h-screen flex justify-evenly items-center">
            <div className="w-[50%] h-full"></div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[350px] h-[500px] rounded-3xl backdrop-blur-md shadow-2xl border border-white/30 bg-white/10 flex flex-col justify-center items-center px-4 py-6 transition-all">
                    {/* User Image */}
                    <div className="w-[100px] h-[100px] rounded-full border-t-1 border-t-amber-200 mb-2 bg-[url('/userlog.png')] bg-center bg-cover "></div>

                    {/* Input Fields */}
                    <div className="w-full flex flex-col items-center mt-2 space-y-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        />

                        <button
                            onClick={handleLogin}
                            className="w-[280px] h-[45px] rounded-xl bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-semibold text-lg transition-all shadow-lg"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
