import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import toast from "react-hot-toast";




export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [notFound, setNotFound] = useState(false);

    // useEffect(
    //     () => {
    //         if (isLoading == true && query.length > 0) {
    //             axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query).then((res) => {

    //                 setProducts(res.data);
    //                 setIsLoading(false);
    //             })
    //         }
    //     }, [isLoading]
    // )

    return (
        <div className="w-full h-full flex flex-col items-center p-4">

            <input type="text"
                placeholder="search for products..."
                value={query}
                onChange={
                    async (e) => {
                        setQuery(e.target.value);
                        setIsLoading(true);
                        if (e.target.value.length == 0) {
                            setProducts([]);
                            setIsLoading(false);
                            setNotFound(false);
                            return;
                        }
                        try {
                            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query);
                            setProducts(response.data);
                            setNotFound(response.data.length === 0);
                            //console.log(response);

                            
                        } catch (err) {
                           // toast.error("Error finding your prodct"),
                                console.log(err);
                        } finally {
                            setIsLoading(false);
                        }



                    }}
                className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            />


            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center overflow-y-scroll mt-6 ">
                {
                    query.length == 0 ? (<h1 className=" text-center text-gray-500 text-lg font-medium mt-[-300px]">Please enter a product name in the search bar</h1>

                    ) : isLoading ? (<Loading />

                    ) : notFound ? (
                        <h1 className="text-emerald-700 text-[40px] font-semibold">Not Found</h1>
                    ) : (
                        <div>
                            {

                                products.map(
                                    (product) => {
                                        return (
                                            <ProductCard key={product.productId} product={product} />
                                        )

                                    })

                            }</div>
                    )

                }


            </div>
        </div>
    )
}