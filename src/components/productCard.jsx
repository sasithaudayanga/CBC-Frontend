import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();

    const formatPrice = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount).replace("₹", "Rs.");
    };

    return (
        <Link
            to={"/overview/" + product.productId}
            className="w-[250px] h-[400px] bg-white/80 backdrop-blur-sm shadow-md rounded-xl m-3 flex flex-col transition-transform hover:scale-105 hover:shadow-xl duration-200 overflow-hidden border border-gray-200"
        >
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="object-contain h-full p-2"
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">
                    {product.productName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.productDescription}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-semibold text-green-600">
                        {formatPrice(product.price)}
                    </span>
                    {product.labelledPrice > product.price && (
                        <span className="text-sm line-through text-gray-500">
                            {formatPrice(product.labelledPrice)}
                        </span>
                    )}
                </div>

                {/* Stock Status + Buy Now */}
                <div className="mt-auto pt-2 flex items-center justify-between">
                    {product.isAvailable && product.stock > 0 ? (
                        <>
                            <span className="text-sm text-green-700 font-medium">
                                In stock ({product.stock})
                            </span>
                            <button className="px-3 py-1.5 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 active:bg-blue-700 transition-transform hover:scale-105"
                            >
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
