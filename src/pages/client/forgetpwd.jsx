import { useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
    const [OTPsent, setOTPsent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const navigte = useNavigate();

    function sendOTP() {
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/otp`, { email })
            .then((res) => {
                setOTPsent(true);
                toast.success(res.data.message || "OTP sent successfully");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Failed to send OTP");
                console.error(err);
            });
    }

    function verifyOTP() {
        const otpinNumber = parseInt(otp, 10);

        if (!otp || !newPassword || !conPassword) {
            toast.error("Please fill all fields.");
            return;
        }

        if (newPassword !== conPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/users/resetpwd", {
                email: email,
                otp: otpinNumber,
                newPassword: newPassword
            })
            .then((response) => {
                toast.success("Password reset successful!");
                console.log(response.data);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("verify");
                navigte("/login");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "OTP validation failed");
                console.error(err);
            });
    }

    return (
        <>
            <Header />
            <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        {OTPsent ? "Reset Your Password" : "Password Reset Request"}
                    </h2>

                    {!OTPsent ? (
                        <>
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            />
                            <button
                                onClick={sendOTP}
                                className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 active:scale-95 transition duration-200"
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                pattern="\d{6}"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value.replace(/\D/g, ''))} // Only digits
                                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 
             rounded-lg text-gray-700 text-center tracking-widest font-mono 
             text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            />

                            <input
                                type="password"
                                placeholder="Enter new password..."
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            />
                            <input
                                type="password"
                                placeholder="Confirm new password..."
                                value={conPassword}
                                onChange={(e) => setConPassword(e.target.value)}
                                className="w-full px-4 py-2 mb-6 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                            />

                            <button
                                onClick={verifyOTP}
                                className="w-full py-2 mb-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 active:scale-95 transition duration-200"
                            >
                                Reset Password
                            </button>

                            <button
                                onClick={() => {
                                    setOTPsent(false);
                                }}
                                className="w-full py-2 bg-white text-emerald-600 border border-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 active:scale-95 transition duration-200"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
