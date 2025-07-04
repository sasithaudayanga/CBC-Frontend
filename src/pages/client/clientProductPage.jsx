import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";




export default function ClientProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        ()=>{
            if(isLoading==true){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                    
                    setProducts(res.data);
                    setIsLoading(false);
                })
            }
        },[isLoading]
    )

    return(
        <div className="w-full h-full pt-1.5 flex flex-wrap justify-center items-center overflow-y-scroll ">
            {
                isLoading ?
                <Loading/>:
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