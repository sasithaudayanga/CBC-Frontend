import { Link } from "react-router-dom"
import UserData from "./userdata"


export default function Header(){
    return(
        <div className="bg-[#444] w-full h-[150px] top-[0px]" >
            <h1 className="text-blue-400 font-bold text-4xl text-center">CRYSTAL BEAUTY CLEAR</h1>
            <p className="text-blue-400 font-sans font-style-oblique text-1xl text-center">Everything Under One Space</p>
            <Link to="/">Home</Link>|
            <Link to="/login">LogIn</Link>|
            <Link to="/signup">Sign Up</Link>

        </div>
    )
}

