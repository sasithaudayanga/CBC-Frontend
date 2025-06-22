import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider"
import Loading from "../../components/loading"
import { addCart, getCart } from "../../utils/cart"

export default function ProductOverviewPage() {
    const params = useParams()
    const productId = params.id
    const [status, setStatus] = useState("loading") //loading,success,error
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    useEffect(
        () => {

            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (res) => {
                    console.log(res)
                    setProduct(res.data)
                    setStatus("success")

                }
            ).catch((err) => {
                console.log(err)
                setStatus("error")
                toast.error(err.response.data.message)

            })
        }

        , [])

    return (
        <>
            {status == "success" && (
                <div className="w-full h-screen overflow-y-auto md:overflow-hidden md:h-full md:mt-10 flex flex-col md:flex-row">
                    <h1 className="w-full h-full block my-4 md:hidden text-center py-1 md:py-0 text-4xl font-semibold text-secondary">
                        {product.productName}
                        {
                            product.altNames.map((altNames, index) => {
                                return (
                                    <span key={index} className="text-4xl font-normal text-gray-500">{" | " + altNames}</span>
                                )
                            })

                        }

                    </h1>
                    <div className="w-full p-3 md:p-0  md:w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images} />

                    </div>
                    <div className="w-full md:w-[50%] h-full flex justify-center items-center">
                        <div className="w-[90%] md:w-[500px] h-[600px] flex flex-col items-center">
                            <h1 className="w-full hidden md:block text-center text-4xl font-semibold text-secondary">
                                {product.productName}
                                {
                                    product.altNames.map((altNames, index) => {
                                        return (
                                            <span key={index} className="text-4xl font-normal text-gray-500">{" | " + altNames}</span>
                                        )
                                    })

                                }

                            </h1>
                            <h1 className="text-md my-2 mt-25 md:mt-0 text-gray-500 w-full text-center font-semibold">
                                {product.productId}</h1>
                            <p className="text-md my-2 text-gray-500 w-full font-semibold text-justify">
                                {product.productDescription}</p>
                            <div className="my-2 w-full flex flex-col md:block text-center">
                                {product.labelledPrice > product.price && (
                                    <span className="text-2xl text-gray-500 font-semibold line-through mx-4">
                                        LKR {product.labelledPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                )}
                                <span className="text-2xl text-green-600  mx-4 font-bold">
                                    LKR {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="w-full flex gap-3 md:gap-0 flex-col md:flex-row justify-center items-center mt-4">
                                <button onClick={(e) => {

                                    navigate("/checkout", {
                                        state: {
                                            cart: [
                                                {
                                                    productId: product.productId,
                                                    name: product.productName,
                                                    image: product.images[0],
                                                    price: product.price,
                                                    labelledPrice: product.labelledPrice,
                                                    qty: 1,
                                                },
                                            ],
                                        },
                                    });
                                }} className="w-[200px] h-[50px] bg-[#67AE6E] rounded-2xl
                                 text-white font-bold mx-3 text-[17px] cursor-pointer hover:bg-[#328E6E] transition-all duration-300">
                                    Buy Now
                                </button>
                                <button onClick={() => {
                                    addCart(product, 1)
                                }} className="w-[200px] h-[50px] bg-[#578FCA] rounded-2xl
                                 text-white font-bold mx-3 text-[17px] cursor-pointer hover:bg-[#3674B5] transition-all duration-300">
                                    Add to Cart
                                </button>


                            </div>


                        </div>

                    </div>
                </div>
            )}
            {status == "loading" && <Loading />

            }

        </>
    )
}