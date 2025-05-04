import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()

    async function handleLogin() {

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
                email: email,
                password: password
            })

            toast.success(response.data.message)
            localStorage.setItem("token",response.data.token)
            const token=localStorage.getItem("token")

            if(response.data.role==="admin"){
                navigate("/admin")

            }else{
                navigate("/")

            }
            

        } catch (err) {
            toast.error(err.response.data.message)
        }

    }

    return (
        <div className="w-full  bg-[url('/loginbg.jpg')] bg-center bg-cover h-screen flex justify-evenly items-center ">
            <div className="w-[50%] h-full bg-white">

            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[350px] h-[500px] rounded-4xl backdrop-blur-md shadow-2xl flex flex-col justify-center items-center">
                    
                    <div className=" w-[100px] h-[100px] rounded-full shadow shadow-white mb-0 flex flex-col justify-center items-center bg-[url('/userlog.png')] bg-origin-border bg-center">

                    </div>

                    <div className="w-[350px] h-[300px] flex flex-col justify-center items-center mt-0">
                        <input
                            onChange={
                                (e) => {
                                   
                                    setEmail(e.target.value)
                                }}
                            value={email}
                            placeholder="Email" className="my-[10px] w-[300px] h-[50px] 
                     border border-[#c3efe9] rounded-2xl"
                        />

                        <input
                            onChange={
                                (e) => {
                                   
                                    setPassword(e.target.value)
                                }}
                            value={password}
                            placeholder="Password" className="my-[10px] w-[300px] h-[50px] border
                      border-[#c3efe9]  rounded-2xl" type="password"
                        />

                        <button
                            onClick={handleLogin}
                            className="cursor-pointer my-[10px] w-[300px] h-[50px] 
                    border border-[#c3efe9] rounded-2xl font-bold
                     text-white text-[25px]">
                            LogIn
                        </button>

                    </div>


                </div>

            </div>
        </div>
    )
}