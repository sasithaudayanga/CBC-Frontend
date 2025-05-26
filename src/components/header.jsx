import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";

export default function Header() {
  const navigate = useNavigate();

  const [showBadge, setShowBadge] = useState(localStorage.getItem("cart-glow") === "true");
  const [addedQty, setAddedQty] = useState(parseInt(localStorage.getItem("cart-added-qty") || "0"));

  useEffect(() => {
    const handleCartUpdate = () => {
      const glow = localStorage.getItem("cart-glow") === "true";
      const qty = parseInt(localStorage.getItem("cart-added-qty") || "0");

      if (glow && qty > 0) {
        setShowBadge(true);
        setAddedQty(qty);
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  const handleCartClick = () => {
    localStorage.removeItem("cart-glow");
    localStorage.removeItem("cart-added-qty");
    setShowBadge(false);
    setAddedQty(0);
    navigate("/cart");
  };

  return (
    <header className="w-full h-[80px] shadow-lg bg-white flex items-center justify-between px-6 border-b border-gray-200">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src="/homelogo.png"
        alt="Logo"
        className="w-[70px] h-[70px] m-2 cursor-pointer hover:scale-105 transition-transform duration-200"
      />

      {/* Navigation Links */}
      <nav className="flex-grow flex justify-center items-center space-x-8">
        <a href="/" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Home</a>
        <a href="/products" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Products</a>
        <a href="/about" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">About Us</a>
        <a href="/contact" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Contact</a>
      </nav>

      {/* Cart Icon */}
      <div className="relative w-[80px] h-[80px] flex justify-center items-center">
        <div
          onClick={handleCartClick}
          className="text-[35px] text-emerald-600 cursor-pointer hover:scale-110 transition-transform duration-200"
        >
          <GiShoppingCart />
        </div>

        {/* Cart Badge */}
        {showBadge && addedQty > 0 && (
          <div className="absolute top-2 right-2 w-[22px] h-[22px] rounded-full bg-red-500 text-white text-sm flex justify-center items-center font-bold shadow-md">
            {addedQty}
          </div>
        )}
      </div>
    </header>
  );
}
