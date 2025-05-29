import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function AddProduct() {

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first")
            return
        }

		if (images.length <= 0) {
			toast.error("Please select at least one image");
			return;
		}

		const promisesArray = [];

		for (let i = 0; i < images.length; i++) {
			promisesArray[i] = mediaUpload(images[i]);
		}
		try {
			const imageUrls = await Promise.all(promisesArray);
			console.log(imageUrls);

            const altNamesArray = altNames.split(",")

            const product = {
                productId : productId,
                productName : productName,
                altNames : altNamesArray,
                productDescription : productDescription,
                images : imageUrls,
                labelledPrice : labelledPrice,
                price : price,
                stock : stock,
            }
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product , {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then(() => {
                toast.success("Product added successfully")
                navigate("/admin/products")
            }).catch((e) => {
                toast.error(e.response.data.message)
            })

		} catch (e) {
			console.log(e);
		}
	}

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="bg-green-800 rounded-md text-2xl font-extrabold text-white mb-6 text-center">
          Add New Product
        </h2>

        {/* Form starts */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            AddProduct();
          }}
          className="space-y-5"
        >
          {/* Product ID */}
          <div>
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product ID
            </label>
            <input
              id="productId"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Product ID"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Alternative Names */}
          <div>
            <label
              htmlFor="altNames"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alternative Names (comma separated)
            </label>
            <input
              id="altNames"
              type="text"
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
              placeholder="e.g., Alt Name 1, Alt Name 2"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe your product..."
              rows={3}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Images
            </label>
            <input
              id="images"
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
              accept="image/*"
              required
            />
          </div>

          {/* Prices and Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="labelledPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Labelled Price
              </label>
              <input
                id="labelledPrice"
                type="number"
                min="0"
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(Number(e.target.value))}
                placeholder="Labelled Price"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Price"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="Stock"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Link
              to="/admin/products"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            >
              Cancel
            </Link>

            <button
            
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
