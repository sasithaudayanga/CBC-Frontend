import { useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EmailVerifcationPage() {
    const [OTPsent, setOTPsent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const navigate = useNavigate();

    function verifyCode() {
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }
        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit code.");
            return;
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify`, { email, otp }).then((res) => {
            toast.success(res.data.message);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("verify");
            navigate("/login");
        })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Verification failed");
                console.error(err);
            });
    }



    return (
        <>
            <Header />
            <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Email Vrificatioon
                    </h2>



                    <>

                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            pattern="\d{6}"
                            placeholder="Enter 6-digit CODE"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value.replace(/\D/g, ''))} // Only digits
                            className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 
             rounded-lg text-gray-700 text-center tracking-widest font-mono 
             text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />


                        <button
                            onClick={verifyCode}
                            className="w-full py-2 mb-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 active:scale-95 transition duration-200"
                        >
                            Verify
                        </button>

                        <button
                            onClick={() => {
                                setOTPsent(false);
                            }}
                            className="w-full py-2 bg-white text-emerald-600 border border-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 active:scale-95 transition duration-200"
                        >
                            Resend Verification Code
                        </button>
                    </>

                </div>
            </div>
        </>
    );
}
