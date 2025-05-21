import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export default function ProductOverviewPage() {
    const params = useParams()
    const productId = params.id
    const [status,setStatus]=useState("loading") //loading,success,error
    const [product,setProduct]=useState(null)

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
        <div className="">Overview Page {JSON.stringify(product)}</div>
    )
}
