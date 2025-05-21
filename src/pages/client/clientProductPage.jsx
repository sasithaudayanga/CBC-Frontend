import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";




export default function ClientProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        ()=>{
            if(isLoading==true){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);
                })
            }
        },[isLoading]
    )

    return(
        <div className="w-full h-full flex flex-wrap justify-center items-center overflow-y-scroll ">

        {
            products.map(
                (product)=>{
                    return(
                        <ProductCard key={product.productId} product={product}/>
                    )

            })
        }

        </div>
    )
}