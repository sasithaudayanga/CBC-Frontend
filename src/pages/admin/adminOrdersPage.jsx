import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';


export default function OrdersPage() {
    const [order, setOrder] = useState([]);
    const [isLoadin, setIsLoading] = useState(true);
    let subtitle; const [isModalOpen, setIsModalOpen] = useState(false);
    const[activeOrder,setActiveOrder]=useState(0)
    const navigate = useNavigate();

    useEffect(() => {

        if (isLoadin) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then(
                (res) => {
                    console.log(res.data);
                    setOrder(res.data);
                    setIsLoading(false);
                }).catch((err) => {
                    console.log(err.res.data);
                })
        }

    }, [isLoadin]);


    

        function openModal() {
            setIsModalOpen(true);
        }

       

        function closeModal() {
            setIsModalOpen(false);
        }










    return (
        <div className="relative w-full h-full overflow-hidden flex flex-col px-4 py-6 bg-gray-50">
            <div className="relative w-full h-[100px]">
                <div className="absolute w-full h-[30px] top-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2 ">
                        ORDER MANAGEMENT
                    </h2>
                </div>
            </div>

            <div className="absolute top-20 w-full h-full pr-10">
                <Modal
                    isOpen={isModalOpen}
                    onAfterOpen={() => { }}
                    onRequestClose={() => { setIsModalOpen(false) }}
                    contentLabel="Example Modal"
                   
                >
                    <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-emerald-100 rounded">
                           {JSON.stringify(order[activeOrder])}
                          
                           
                    </div>
                </Modal>
                {isLoadin ? (
                    <div className="w-full h-[400px] flex justify-center items-center">
                        <div className="w-16 h-16 border-8 border-t-red-600 border-gray-300 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="max-h-[600px] overflow-y-auto rounded-lg shadow-lg bg-white pb-8 to-0%">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-gray-300 text-gray-800 text-base">
                                    <th className="px-4 py-2 border border-white text-left">Order ID</th>
                                    <th className="px-4 py-2 border border-white text-left">Name</th>
                                    <th className="px-4 py-2 border border-white text-left">Email</th>
                                    <th className="px-4 py-2 border border-white text-left">Address</th>
                                    <th className="px-4 py-2 border border-white text-left">Contact No</th>
                                    <th className="px-4 py-2 border border-white text-right">Total</th>
                                    <th className="px-4 py-2 border border-white text-left">Date</th>
                                    <th className="px-4 py-2 border border-white text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((item, index) => (
                                    <tr key={index} onClick={() => {
                                        setActiveOrder(index); 
                                        setIsModalOpen(true);
                                         }} className="hover:bg-gray-200 transition-all duration-150">
                                        <td className="px-4 py-2 border border-white shadow">{item.orderId}</td>
                                        <td className="px-4 py-2 border border-white shadow">{item.name}</td>
                                        <td className="px-4 py-2 border border-white shadow">{item.email}</td>
                                        <td className="px-4 py-2 border border-white shadow">{item.address}</td>
                                        <td className="px-4 py-2 border border-white shadow">{item.phone}</td>
                                        <td className="px-4 py-2 border border-white shadow text-right">
                                            LKR {item.total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow">
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border border-white shadow text-center">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}