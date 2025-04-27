

export default function ProductCard(props) {

    return (
        <div className="card">
            <img className="productImage" src={props.picture} />
            <h1 className="text-[25px] font-bold text-gray-800 font-serif">{props.name}</h1>
            <p className="text-gray-600 text-[10px]">{props.description}</p>
            <h2>Price: {props.price}</h2>
            <button className="addCart">Add to cart</button>
            <button className="buy">Buy Now</button>
        </div>
    )
}
