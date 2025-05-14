import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";

export default function EditProductPage() {
    const location = useLocation()
    const [productId, setProductId] = useState(location.state.productId);
    const [productName, setProductName] = useState(location.state.productName);
    const [altNames, setAltNames] = useState(location.state.altNames.join(","));
    const [productDescription, setProductDescription] = useState(location.state.productDescription);
    const [images, setImages] = useState([]);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [price, setPrice] = useState(location.state.price);
    const [stock, setStock] = useState(location.state.stock);
    const navigate = useNavigate()

    console.log(location)





    async function UpdateProducts(e) {

        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login first")
            return
        }
        let imagesUrl = location.state.images

        const promisesArray = []

        for (let i = 0; i < images.length; i++) {
            promisesArray[i] = mediaUpload(images[i])
        }
        try {

            if (images.length > 0) {
                imagesUrl = await Promise.all(promisesArray);
            }

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
                const response = await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId, product, {
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
            <h1 className="text-black font-bold text-2xl">Edit Product</h1>

            <input type="text"
            disabled
                onChange={
                    (e) => {
                        setProductId(e.target.value)
                    }} placeholder="Product ID"

                value={productId}
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setProductName(e.target.value)
                    }} placeholder="Product Name"
                value={productName}
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setAltNames(e.target.value)
                    }} placeholder="Alter Names"
                value={altNames}
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>

            <input type="text"
                onChange={
                    (e) => {
                        setProductDescription(e.target.value)
                    }}
                value={productDescription} placeholder="Product Description"
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
                    }} value={labelledPrice} placeholder="Labelled Price"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>


            <input type="number"
                onChange={
                    (e) => {
                        setPrice(Number(e.target.value))
                    }} value={price} placeholder="Price"
                className="input input-bordered w-full max-w-xs
                shadow shadow-gray-400 m-[2px]"/>


            <input type="number"
                onChange={
                    (e) => {
                        setStock(Number(e.target.value))
                    }} value={stock} placeholder="Stock"
                className="input input-bordered w-full max-w-xs
                 shadow shadow-gray-400 m-[2px]"/>

            <div className="w-full flex justify-center flex-row items-center mt-4 text-center">
                <Link to="/admin/products"
                    className="w-[90px] bg-red-500 text-white font-bold py-2 rounded mr-4">
                    Return
                </Link>
                <button onClick={UpdateProducts}
                    className="cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded">
                    Update
                </button>
            </div>

        </div >
    )
}
