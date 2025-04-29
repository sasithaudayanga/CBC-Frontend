import { Link } from "react-router-dom"
import UserData from "./userdata"


export default function Header(){
    return(
        <div className="bg-[#444] w-full h-[150px] top-[0px]" >
            <h1 className="text-blue-400 font-bold text-4xl text-center">CRYSTAL BEAUTY CLEAR</h1>
            <p className="text-blue-400 font-sans font-style-oblique text-1xl text-center">Everything Under One Space</p>
            <Link to="/" className="text-white">Home</Link>|
            <Link to="/login" className="text-white">LogIn</Link>|
            <Link to="/signup" className="text-white">Sign Up</Link>

        </div>
    )
}

