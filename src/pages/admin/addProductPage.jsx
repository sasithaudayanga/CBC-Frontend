import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";


export default function AddProductPage() {

    const [productId, setProductId] = useState("")
    const [productName, setProductName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [images, setImages] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const navigate=useNavigate()



    async function AddProducts(e) {

        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login first")
            return
        }
        if (images.length <= 0) {
            toast.error("Please select at least one image")
            return
        }
        const promisesArray = []

        for (let i = 0; i < images.length; i++) {
            promisesArray[i] = mediaUpload(images[i])
        }
        try {

            const imagesUrl = await Promise.all(promisesArray)
            console.log(imagesUrl)

            const altNameArray = altNames.split(",")
            const product = {
                productId: productId,
                productName: productName,
                altNames: altNames,
                productDescription: productDescription,
                images: imagesUrl,
                labelledPrice: labelledPrice,
                price: price,
                stock: stock
            }
            console.log(product)

            try {
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                toast.success(response.data.message)
                navigate("/admin/products")

            } catch (err) {
                toast.error(err.response.data.message)
            }


        } catch (e) {
            console.log(e)
        }


    }


    return (

        < div className="w-full h-full flex flex-col justify-center items-center " >

            <input type="text"
                onChange={
                    (e) => {
                        setProductId(e.target.value)
                    }} placeholder="Product ID"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setProductName(e.target.value)
                    }} placeholder="Product Name"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setAltNames(e.target.value)
                    }} placeholder="Alter Names"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setProductDescription(e.target.value)
                    }} placeholder="Product Description"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="file"
                onChange={
                    (e) => {
                        setImages(e.target.files)
                    }} multiple placeholder="Images"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>


            <input type="number"
                onChange={
                    (e) => {
                        setLabelledPrice(Number(e.target.value))
                    }} placeholder="Labelled Price"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>


            <input type="number"
                onChange={
                    (e) => {
                        setPrice(Number(e.target.value))
                    }} placeholder="Price"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>


            <input type="number"
                onChange={
                    (e) => {
                        setStock(Number(e.target.value))
                    }} placeholder="Stock"
                className="input input-bordered w-full max-w-xs
                 shadow shadow-gray-400 m-[2px]"/>

            <div className="w-full flex justify-center flex-row items-center mt-4 text-center">
                <Link to="/admin/products" className="w-[90px] bg-red-500 text-white font-bold py-2 rounded mr-4">Cancel</Link>
                <button onClick={AddProducts} className="cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded">Add Product</button>
            </div>

        </div >
    )
}