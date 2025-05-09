
import { useState } from "react"
import mediaUpload from "../utils/mediaUpload.jsx"

export default function TestPage() {
    const [image,setImage] = useState(null)

   function FileUpload(){
    mediaUpload(image).then(
        (res) => {
            console.log(res)
        }
    ).catch(
        (res) => {
            console.log(res)
        })

   }
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input
                onChange={(e) => {
                    setImage(e.target.files[0])
                    console.log(e.target.files[0])
                }}
                type="file" className="file-input file-input-bordered w-full max-w-xs cursor-pointer bg-green-200" />
            <button onClick={FileUpload} className="bg-red-300">Add Image</button>
        </div>
    )
}