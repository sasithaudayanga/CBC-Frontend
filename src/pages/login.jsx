import { useState } from "react"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin() {
        console.log(email)
        console.log(password)
    }

    return (
        <div className="w-full  bg-[url('/loginbg.jpg')] bg-center bg-cover h-screen flex justify-evenly items-center ">
            <div className="w-[50%] h-full bg-white">

            </div>

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] rounded-3xl backdrop-blur-md shadow-2xl flex flex-col justify-center items-center">
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value)
                            }}
                        className="my-[10px] w-[300px] h-[50px] 
                     border border-[#c3efe9] rounded-2xl"
                    />

                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }}
                        className="my-[10px] w-[300px] h-[50px] border
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
    )
}