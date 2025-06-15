import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/users",
                {
                    email,
                    password,
                    firstName,
                    lastName
                }
            );

            toast.success(response.data.message || "Signup successful");
            navigate("/login"); 
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
            
        }
    }

    return (
        <div className="w-full bg-[url('/loginbg.jpg')] bg-center bg-cover h-screen flex justify-evenly items-center">
            <div className="w-[50%] h-full bg-white opacity-0"></div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[350px] h-[550px] rounded-3xl backdrop-blur-md bg-white/10 border border-white/30 shadow-2xl px-4 py-6 flex flex-col justify-center items-center transition-all">
                    
                    {/* User Avatar */}
                    <div className="w-[100px] h-[100px] rounded-full mb-3 bg-[url('/userlog.png')] bg-center bg-cover border-1 border-teal-300/30"></div>

                    {/* Signup Form */}
                    <div className="w-full flex flex-col items-center space-y-4 mt-2">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-1 focus:ring-teal-300 transition-all"
                        />

                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-1 focus:ring-teal-300 transition-all"
                        />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-1 focus:ring-teal-300 transition-all"
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            className="w-[280px] h-[45px] px-4 rounded-xl border border-teal-300 bg-white/20 text-black placeholder-gray/70 focus:outline-none focus:ring-1 focus:ring-teal-300 transition-all"
                            />

                        <button
                            onClick={handleSignup}
                            className="w-[280px] h-[45px] hover:scale-102 transition-all rounded-xl bg-gray-200 cursor-pointer  active:scale-90 text-gray-700 font-semibold text-lg shadow-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
