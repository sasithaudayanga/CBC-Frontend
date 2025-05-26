import { useState } from "react"
import { BiMinus } from "react-icons/bi"
import { BsPlus } from "react-icons/bs"
import { VscTrash } from "react-icons/vsc"
import { Link, useLocation } from "react-router-dom"


export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state?.cart || []);

    function getTotal() {
        let total = 0

        cart.forEach((item) => {
            total += item.price * item.qty
        })
        return total

    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index)
        setCart(newCart)
    }

    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty
        if (newQty <= 0) {
            removeFromCart(index);
            return
        } else {
            const newCart=[...cart]
            newCart[index].qty = newQty
            setCart(newCart)
        }
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center pt-4">
            <div className="w-[250px] h-[100px] bg-white shadow-2xl absolute top-1 right-1 flex flex-col justify-evenly items-center rounded-2xl ">
                <p className="text-2xl text-secondary font-bold">Total: LKR {getTotal().toFixed(2)}<span></span></p>
                <Link to="/checkout" className="w-[150px] text-center text-[20px] text-white bg-green-700 font-semiboldbold ursor-pointer rounded-lg hover:bg-red-700 transition-all duration-300">
                    Place Order
                </Link>

            </div>
            {
                cart.map(
                    (item, index) => {
                        return (
                            <div key={index} className="relative justify-center items-center w-[600px] h-[100px] bg-primary shadow-2xl flex  mt-2 rounded-bl-3xl rounded-tl-3xl">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
                                <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
                                    <h1 className="text-[15px] text-gray-600 font-semibold">{item.name}</h1>
                                    <h1 className="text-[10px] text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                            <div className="flex justify-center items-start">
                                                <span className="text-[18px] text-gray-500 font-semibold line-through mx-4">{item.labelledPrice.toFixed(2)}</span>
                                                <span className="text-[18px] text-green-600  mx-4 font-bold">{item.price.toFixed(2)}</span>

                                            </div>
                                            : <span className="text-[18px] text-green-600  mx-4 font-bold"> {(item.price ?? 0).toFixed(2)}</span>
                                    }

                                </div>
                                <div className="w-[100px] h-full flex flex-row justify-between items-center ">
                                    <button onClick={() => {
                                        changeQty(index, 1)

                                    }} className="aspect-square rounded-2xl bg-secondary text-white font-bold hover:bg-secondary/50 cursor-pointer text-[30px]">
                                        <BsPlus />
                                    </button>
                                    <h1 className="text-xl h-full text-secondary font-semibold flex items-center">{item.qty}</h1>
                                    <button onClick={() => {
                                        changeQty(index, -1)

                                    }} className="text-white rounded-2xl bg-secondary aspect-square font-bold hover:bg-secondary/50 cursor-pointer text-[30px]">
                                        <BiMinus />
                                    </button>

                                </div>
                                <div className="w-[150px] h-full flex flex-col justify-center items-center">
                                    <h1 className="text-[15px] text-green-600">Total: LKR {(item.price * item.qty).toFixed(2)}</h1>

                                </div>
                                <div className="group">
                                    <button onClick={() => {
                                        removeFromCart(index)

                                    }} className="absolute rounded-full p-1 right-[-38px] top-[35px] text-red-600 hover:text-white hover:bg-red-600 text-[25px] cursor-pointer">
                                        <VscTrash />
                                        <span className="text-[15px] absolute right-[-30px] top-[-5px] translate-x-1/2 whitespace-nowrap text-black bg-transparent opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
                                            Remove
                                        </span>


                                    </button>



                                </div>


                            </div>
                        )

                    }
                )
            }
        </div>
    )
}