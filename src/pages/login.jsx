import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (res) => {
            const accessToken = res.access_token;
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
                accessToken: accessToken
            }).then((response) => {
                console.log(response.data);
                toast.success(response.data.message);
                const token = response.data.token;
                localStorage.setItem("token", token);

                if (response.data.role === "admin") {
                    navigate("/admin/products");
                } else {
                    navigate("/");
                }
            });
        }
    });

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
            <div className="hidden lg:block w-[50%] h-full"></div>

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
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        />

                        <button
                            onClick={handleLogin}
                            className="w-[280px] h-[45px] hover:scale-102 transition-all rounded-xl bg-gray-200 cursor-pointer  active:scale-90 text-gray-700 font-semibold text-lg shadow-lg"
                        >
                            Sign In
                        </button>
                        <button onClick={googleLogin} className="flex flex-row hover:scale-102 transition-all  justify-center items-center w-[280px] h-[45px] cursor-pointer rounded-xl bg-gray-200 active:scale-90 text-white font-semibold text-lg shadow-lg">
                            <FcGoogle className="text-[20px] mx-2 " />
                            <span className=" text-[15px] text-gray-700 ">Sign in with Google</span>
                        </button>

                        {/* Links */}
                        <div className="flex justify-between items-center w-[280px] mt-3 text-sm">
                            <Link
                                to="/forgot-password"
                                className="text-gray-800 hover:text-black hover:underline transition-all"
                            >
                                Forgot Password?
                            </Link>
                            <span className="text-gray-500">|</span>
                            <Link
                                to="/signup"
                                className="text-gray-800 hover:text-black  hover:underline transition-all"
                            >
                                Create Account
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
