import { useState } from "react";
import { addCart, getCart, getTotal, removeFromCart } from "../../utils/cart";
import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { VscTrash } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function ClientCartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="relative w-[90%] lg:w-full h-full lg:h-full flex flex-col items-center gap-2">
      <div className="hidden lg:flex w-[250px] h-[100px] bg-white shadow-2xl absolute top-1 right-1 flex-col justify-evenly items-center rounded-2xl">
        <p className="text-2xl text-secondary font-bold">
          Total: LKR <span>{getTotal().toFixed(2)}</span>
        </p>
        <Link
          to="/checkout"
          state={{ cart }}
          className="w-[150px] text-center text-[20px] text-white bg-green-600 font-semibold cursor-pointer rounded-lg hover:bg-green-700 hover:scale-105 transition"
        >
          Checkout
        </Link>
      </div>

      {/*Mobile Checkout Block - Visible only on small screens */}

      {cart.map((item, productId) => (
        <div
          key={productId}
          className="relative justify-center items-center w-[310px] lg:w-[600px] h-[60px] lg:h-[100px] shadow-2xl flex mt-2 rounded-bl-xl rounded-tl-xl"
        >
          <img
            src={item.image}
            className=" w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] object-cover rounded-xl"
          />
          <div className="lg:left-0 w-[130px] lg:w-[250px] h-full flex flex-col justify-center items-start pl-1 lg:pl-4">
            <h1 className="text-[8px] lg:text-[15px] text-gray-600 font-semibold">
              {item.name}
            </h1>
            <h1 className="text-[8px] lg:text-[10px] text-gray-600 font-semibold">
              {item.productId}
            </h1>

            {item.labelledPrice > item.price ? (
              <div className=" lg:left-0 flex justify-center items-start">
                <span className="text-[10px] lg:text-[18px] text-gray-500 font-semibold line-through mx-1">
                  {item.labelledPrice.toFixed(2)}
                </span>
                <span className="text-[10px] lg:text-[18px] text-green-600  font-bold">
                  {item.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-[10px] lg:text-[18px] text-green-600 font-bold">
                {(item.price ?? 0).toFixed(2)}
              </span>
            )}
          </div>

          <div className=" w-[40px] lg:w-[100px] h-full flex flex-col lg:flex-row lg:justify-between items-center">
            <button
              onClick={() => {
                addCart(item, 1);
                setCart(getCart());
              }}
              className="aspect-square rounded-2xl bg-secondary text-white font-bold hover:bg-secondary/50 cursor-pointer text-[15px] lg:text-[30px]"
            >
              <BsPlus />
            </button>
            <h1 className="text[20px] px-2 lg:px-0 lg:text-xl h-full text-secondary font-semibold flex items-center">
              {item.qty}
            </h1>
            <button
              onClick={() => {
                addCart(item, -1);
                setCart(getCart());
              }}
              className="text-white rounded-2xl bg-secondary aspect-square font-bold hover:bg-secondary/50 cursor-pointer text-[15px] lg:text-[30px]"
            >
              <BiMinus />
            </button>
          </div>

          <div className=" w-[80px] lg:w-[150px] h-full flex flex-col justify-center items-center">
            <h1 className="text-[10px] lg:text-[15px] text-green-600">
              Total: {(item.price * item.qty).toFixed(2)}
            </h1>
          </div>

          <div className="group">
            <button
              onClick={() => {
                removeFromCart(item.productId);
                setCart(getCart());
              }}
              className="absolute rounded-full p-1 right-[-20px] lg:right-[-38px] top-[18px] lg:top-[35px] text-red-600 hover:text-white hover:bg-red-600 text-[15px] lg:text-[25px] cursor-pointer"
            >
              <VscTrash />
              <span className="text-[8px] lg:text-[15px] absolute right-[-30px] top-[-5px] translate-x-1/2 whitespace-nowrap text-black bg-transparent opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
                Remove
              </span>
            </button>
          </div>
        </div>
      ))}
      <div className="lg:hidden flex w-full h-[100px] bg-white border-t border-t-gray-100 shadow-2xl fixed bottom-0 right-4 flex-col justify-evenly items-center rounded-2xl z-50">
        <p className="text-[15px] text-secondary font-bold">
          Total: LKR <span>{getTotal().toFixed(2)}</span>
        </p>
        <Link
          to="/checkout"
          state={{ cart }}
          className="w-[150px] text-center text-[18px] text-white bg-green-600 font-semibold cursor-pointer rounded-lg hover:bg-green-700 hover:scale-105 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
