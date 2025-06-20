import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";

export default function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showBadge, setShowBadge] = useState(localStorage.getItem("cart-glow") === "true");
  const [addedQty, setAddedQty] = useState(parseInt(localStorage.getItem("cart-added-qty") || "0"));

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="w-full h-[80px] bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4 md:px-10 z-30">
        {/* Sidebar toggle - mobile only */}
        <GiHamburgerMenu
          onClick={() => setSideBarOpen(true)}
          className="text-3xl text-gray-800 cursor-pointer md:hidden"
        />

        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src="/homelogo.png"
          alt="Logo"
          className="w-[60px] h-[60px] cursor-pointer hover:scale-105 transition-transform duration-200"
        />

        {/* Nav links - desktop only */}
        <nav className="hidden md:flex gap-6 text-gray-800 font-semibold text-lg">
          <Link to="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link to="/products" className="hover:text-emerald-600 transition">Products</Link>
          <Link to="/about" className="hover:text-emerald-600 transition">About Us</Link>
          <Link to="/contact" className="hover:text-emerald-600 transition">Contact</Link>
          <Link to="/search" className="hover:text-emerald-600 transition">Search</Link>
        </nav>

        {/* Right section: Cart + Login/Logout */}
        <div className="flex items-center gap-4 relative">
          {/* Auth Button */}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold px-4 py-1
               bg-red-600 text-white rounded hover:bg-red-700 active:scale-85 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm font-semibold px-4 py-1
               bg-emerald-500 text-white rounded hover:bg-emerald-600 active:scale-85 transition-all">
                Login
                </Link>
          )}

          {/* Cart Icon */}
          <div
            onClick={handleCartClick}
            className="relative cursor-pointer text-3xl text-emerald-600 hover:scale-110 transition-transform hidden md:block"
          >
            <GiShoppingCart />
            {showBadge && addedQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full shadow-md">
                {addedQty}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sideBarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex md:hidden">
          <div className="w-[70%] bg-white h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 h-[80px] border-b shadow">
              <img
                onClick={() => {
                  setSideBarOpen(false);
                  navigate("/");
                }}
                src="/homelogo.png"
                alt="Logo"
                className="w-[60px] h-[60px] cursor-pointer hover:scale-105 transition-transform"
              />
              <GiHamburgerMenu
                onClick={() => setSideBarOpen(false)}
                className="text-3xl cursor-pointer"
              />
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col px-6 py-6 gap-4 text-lg font-medium text-gray-700">
              <Link to="/" onClick={() => setSideBarOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setSideBarOpen(false)}>Products</Link>
              <Link to="/about" onClick={() => setSideBarOpen(false)}>About Us</Link>
              <Link to="/contact" onClick={() => setSideBarOpen(false)}>Contact</Link>
              <Link to="/search" onClick={() => setSideBarOpen(false)}>Search</Link>
              <div onClick={() => { setSideBarOpen(false); handleCartClick(); }} className="flex items-center gap-2 text-green-700 text-xl mt-4 cursor-pointer">
                <GiShoppingCart />
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
