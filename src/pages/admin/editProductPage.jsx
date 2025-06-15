import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import mediaUpload from "../../utils/mediaUpload.jsx";
import axios from "axios";

export default function EditProductPage() {
  const location = useLocation();
  const [productId] = useState(location.state.productId); 
  const [productName, setProductName] = useState(location.state.productName);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [productDescription, setProductDescription] = useState(location.state.productDescription);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  async function UpdateProducts(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    let imagesUrl = location.state.images;
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }

    try {
      if (images.length > 0) {
        imagesUrl = await Promise.all(promisesArray);
      }

      const altNameArray = altNames.split(",").map(name => name.trim());

      const product = {
        productId,
        productName,
        altNames: altNameArray,
        productDescription,
        images: imagesUrl,
        labelledPrice,
        price,
        stock,
      };

      const response = await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,product,
        {headers: { Authorization: "Bearer " + token },}
      );

      toast.success(response.data.message);
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  }

  return (
    <div className=" bg-gray-50 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md h-[500px] bg-white p-8 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="bg-green-800 rounded-md text-2xl font-extrabold text-white mb-6 text-center">
          Edit Product
        </h2>

        <form onSubmit={UpdateProducts} className="space-y-5">
          {/* Product ID - disabled */}
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
              disabled
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
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
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              Upload New Images (optional)
            </label>
            <input
              id="images"
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
              accept="image/*"
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
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-red-700 hover:bg-red-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            >
              Return
            </Link>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-md cursor-pointer text-white bg-emerald-700 hover:bg-emerald-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
