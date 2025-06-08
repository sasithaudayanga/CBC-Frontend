import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();

  const [showBadge, setShowBadge] = useState(localStorage.getItem("cart-glow") === "true");
  const [addedQty, setAddedQty] = useState(parseInt(localStorage.getItem("cart-added-qty") || "0"));

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBarOpen]);

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
    <>
      {/* Header */}
      <header className="relative w-full h-[80px] shadow-lg bg-white flex items-center justify-center px-6 border-b border-gray-200 z-30">
        <GiHamburgerMenu
          onClick={() => setSideBarOpen(true)}
          className="absolute left-2 text-3xl md:hidden"
        />

        <img
          onClick={() => navigate("/")}
          src="/homelogo.png"
          alt="Logo"
          className="w-[80px] h-[80px] cursor-pointer hover:scale-105 transition-transform duration-200"
        />

        {/* Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
          <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Home</Link>
          <Link to="/products" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Products</Link>
          <Link to="/about" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">About Us</Link>
          <Link to="/contact" className="text-lg font-semibold text-gray-800 hover:text-emerald-600 transition-colors duration-200">Contact</Link>
        </div>

        {/* Cart Icon */}
        <div className="relative w-[80px] h-[80px] flex justify-center items-center">
          <div
            onClick={handleCartClick}
            className="hidden md:flex text-[35px] text-emerald-600 cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <GiShoppingCart />
          </div>

          {showBadge && addedQty > 0 && (
            <div className="absolute hidden md:flex top-2 right-2 w-[22px] h-[22px] rounded-full bg-red-500 text-white text-sm justify-center items-center font-bold shadow-md">
              {addedQty}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sideBarOpen && (
        <div className="fixed inset-0 z-50 flex w-full h-screen bg-[#00000060] md:hidden">
          <div className="w-[60%] bg-white h-full relative z-50">
            {/* Sidebar Header */}
            <div className="relative w-full h-[80px] shadow-2xl flex items-center bg-white justify-center">
              <GiHamburgerMenu
                onClick={() => setSideBarOpen(false)}
                className="absolute left-2 text-3xl"
              />
              <img
                onClick={() => {
                  setSideBarOpen(false);
                  navigate("/");
                }}
                src="/homelogo.png"
                alt="logo"
                className="w-[80px] h-[80px] cursor-pointer hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Sidebar Links */}
            <div className="w-full h-[calc(100%-80px)] bg-emerald-100 flex flex-col items-center gap-4 pt-6">
              <Link to="/" onClick={() => setSideBarOpen(false)} className="text-[20px] font-medium text-gray-800">Home</Link>
              <Link to="/products" onClick={() => setSideBarOpen(false)} className="text-[20px] font-medium text-gray-800">Products</Link>
              <Link to="/about" onClick={() => setSideBarOpen(false)} className="text-[20px] font-medium text-gray-800">About Us</Link>
              <Link to="/contact" onClick={() => setSideBarOpen(false)} className="text-[20px] font-medium text-gray-800">Contact</Link>
              <Link to="/cart" onClick={() => setSideBarOpen(false)} className="text-[35px] font-medium text-green-800">
                <GiShoppingCart />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
