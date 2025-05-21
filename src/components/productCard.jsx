import { PiCurrencyCny } from "react-icons/pi"; // You can remove this if unused
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const formatPrice = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount).replace("₹", "Rs.");
    };

    return (
        <Link to={"/overview/"+product.productId} className="w-[250px] h-[380px] bg-white shadow rounded-lg m-2 flex flex-col transition-transform hover:scale-105">
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                    src={product.images[0] }
                    alt={product.productName}
                    className="object-contain h-full"
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {product.productName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {product.productDescription}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold text-green-600">
                        {formatPrice(product.price)}
                    </span>
                    {product.labelledPrice > product.price && (
                        <span className="text-sm line-through text-gray-500">
                            {formatPrice(product.labelledPrice)}
                        </span>
                    )}
                </div>

                {/* Bottom Row: Stock Status + Buy Button */}
                <div className="mt-auto pt-2 flex items-center justify-between">
                    {product.isAvailable && product.stock > 0 ? (
                        <>
                            <span className="text-sm text-green-700 font-medium">
                                In stock ({product.stock})
                            </span>
                            <button className="px-3 py-1.5 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-transform hover:scale-105">
                                Buy Now
                            </button>
                        </>
                    ) : (
                        <span className="text-sm text-red-600 font-medium mx-auto">
                            Out of stock
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
