import { useState } from "react"

export default function ImageSlider(props){
const images=props.images
const [currentIndex,setCurrentIndex]=useState(0)

    return(
        <div className="w-[400px] h-[600px] rounded-2xl mt-[-80px] ">
            <div className="w-full h-[500px] rounded-2xl">
                <img src={images[currentIndex]} className="mt-4 md:mt-0 w-full h-full bg-cover rounded-2xl" />

            </div>
            
            <div className="w-full h-[100px] flex justify-center items-center ">
                {
                    images?.map(
                        (image,index)=>{
                            return(
                                <img key={index} className={"w-[90px] h-[90px] object-cover rounded-2xl m-2 cursor-pointer hover:border-4 hover:border-accent "+(index==currentIndex&&"border-green-500 border-3")} src={image} 
                                onClick={
                                    ()=>{
                                        setCurrentIndex(index)

                                }}/>
                            )

                        }
                    )
                }
            </div>

        </div>
    )
}