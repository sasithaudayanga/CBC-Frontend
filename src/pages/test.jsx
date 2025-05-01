import { useState } from "react"

export default function TestPage() {
    const [count, setCount] = useState(0)
    const [pass, setPassed] = useState("Passed ?")
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-[350px] h-[100px] shadow shadow-blue-200 flex justify-center items-center">
                <button onClick={
                    () => {

                        console.log("- Clicked")
                        setCount(count - 1)

                    }} className=" mx-[10px] cursor-pointer bg-blue-400 text-white font-bold text-center w-[100px] h-[40px] text-[20px]">
                    -
                </button>

                <span className=" mx-[20px] text-[40px] font-bold cursor-default flex justify-center items-center">
                    {count}
                </span>

                <button onClick={
                    () => {

                        console.log("+ Clicked")
                        setCount(count + 1)

                    }} className=" mx-[10px] cursor-pointer bg-blue-400 text-white font-bold text-center w-[100px] h-[40px] text-[20px]">
                    +
                </button>
            </div>

            <div className=" w-[350px] h-[100px] shadow shadow-green-400 flex flex-col justify-center items-center ">

                <span className=" w-full mx-[20px] text-[40px] font-bold cursor-default flex justify-center items-center">
                  {pass}
                </span>

                <div>
                    <button onClick={
                        () => {

                            console.log("Passed")
                            setPassed("Passed")

                        }} className=" mx-[10px] cursor-pointer bg-blue-400 text-white font-bold text-center w-[100px] h-[40px] text-[20px]">
                        Passed
                    </button>
                    <button onClick={
                        () => {

                            console.log("Failed")
                            setPassed("Failed")

                        }} className=" mx-[10px] cursor-pointer bg-blue-400 text-white font-bold text-center w-[100px] h-[40px] text-[20px]">
                        Failed
                    </button>
                </div>



            </div>
        </div>
    )
}