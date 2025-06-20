import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate=useNavigate();
    
    return (
        <main className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50">
            {/* Overlay Text Content */}
            <div className="text-center px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-700 drop-shadow-sm mb-6 animate-fade-in-down">
                    Welcome to <span className="text-emerald-500">YourStore</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                    Discover quality, shop with confidence. Explore curated products made for modern living.
                </p>

                <div className="flex justify-center gap-4 animate-fade-in-up">
                    <Link
                        to="/products"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300"
                    >
                        Shop Now
                    </Link>
                    
                </div>
            </div>
        </main>
    );
}
