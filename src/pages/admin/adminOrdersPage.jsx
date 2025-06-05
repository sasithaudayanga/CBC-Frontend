import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { CgClose } from "react-icons/cg";

Modal.setAppElement('#root');

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error?.response?.data || error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const openModal = (order) => {
        setActiveOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveOrder(null);
    };

    const truncateWords = (text, limit = 20) => {
        const words = text.split(" ");
        return words.length > limit
            ? words.slice(0, limit).join(" ") + "..."
            : text;
    };


    return (
        <div className="w-full h-full px-4 py-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                ORDER MANAGEMENT
            </h2>

            {isLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                    <div className="w-16 h-16 border-8 border-t-red-600 border-gray-300 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="max-h-[600px] overflow-y-auto rounded-lg shadow bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead >
                            <tr className="bg-gray-300 text-gray-800 text-base">
                                <th className="px-4 py-2 border border-white text-left">Order ID</th>
                                <th className="px-4 py-2 border border-white text-left">Name</th>
                                <th className="px-4 py-2 border border-white text-left">Email</th>
                                <th className="px-4 py-2 border border-white text-left">Address</th>
                                <th className="px-4 py-2 border border-white text-left">Contact No</th>
                                <th className="px-4 py-2 border border-white text-left">Total (LKR)</th>
                                <th className="px-4 py-2 border border-white text-left">Date</th>
                                <th className="px-4 py-2 border border-white text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    onClick={() => openModal(order)}
                                    className="hover:bg-gray-200 transition-all duration-150"
                                >
                                    <td className="px-4 py-2 border border-white shadow">{order.orderId}</td>
                                    <td className="px-4 py-2 border border-white shadow">{order.name}</td>
                                    <td className="px-4 py-2 border border-white shadow">{order.email}</td>
                                    <td className="px-4 py-2 border border-white shadow">{order.address}</td>
                                    <td className="px-4 py-2 border border-white shadow">{order.phone}</td>
                                    <td className="px-4 py-2 border border-white shadow text-right">
                                        {order.total.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-2 border border-white shadow text-right">

                                        {new Date(order.date).toLocaleDateString('en-GB')}
                                    </td>
                                    <td className="px-4 py-2 border border-white shadow">{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    className="bg-white p-8 rounded-xl shadow-2xl max-w-6xl mx-auto mt-20 overflow-y-auto max-h-[85vh] print:max-h-full print:overflow-visible"
    overlayClassName="fixed inset-0 bg-[#00000060] bg-opacity-40 flex justify-center items-start z-50"
    contentLabel="Order Details"
>
    {activeOrder && (
        <div className="space-y-6 print:space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                    Order #{activeOrder.orderId}
                </h3>
                <div className="space-x-3 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-transform transform hover:scale-105"
                    >
                        Print
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-transform transform hover:scale-105"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <p><span className="font-medium">Name:</span> {activeOrder.name}</p>
                <p><span className="font-medium">Order Date:</span> {new Date(activeOrder.date).toLocaleDateString('en-GB')}</p>
                <p><span className="font-medium">Email:</span> {activeOrder.email}</p>
                <p><span className="font-medium">Labelled Total:</span> LKR {activeOrder.labelledTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                <p><span className="font-medium">Phone:</span> {activeOrder.phone}</p>
                <p><span className="font-medium">Discount:</span> LKR {(activeOrder.labelledTotal - activeOrder.total).toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                <p><span className="font-medium">Address:</span> {activeOrder.address}</p>
                <p><span className="font-medium">Total:</span> LKR {activeOrder.total.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</p>
                <p><span className="font-medium">Status:</span> {activeOrder.status}</p>             
                
                
                
            </div>

            {/* Products Table */}
            <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Product Details</h4>
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full bg-white text-sm text-left border-collapse">
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="px-4 py-2 border-1 border-white">Image</th>
                                <th className="px-4 py-2 border-1 border-white">Product Name</th>
                                <th className="px-4 py-2 border-1 border-white text-center">Qty</th>
                                <th className="px-4 py-2 border-1 border-white text-right">Labelled Price (LKR)</th>
                                <th className="px-4 py-2 border-1 border-white text-right">Discount (LKR)</th>
                                <th className="px-4 py-2 border-1 border-white text-right">Price (LKR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeOrder.products.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-all">
                                    <td className="border-1 border-white shadow px-4 py-2">
                                        <img
                                            src={item.productInfo.images[0]}
                                            alt={item.productInfo.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border-1 border-white shadow px-4 py-2">{item.productInfo.name}</td>
                                    
                                    <td className="border-1 border-white shadow px-4 py-2 text-center">{item.qty}</td>
                                    <td className="border-1 border-white shadow px-4 py-2 text-right">
                                        {item.productInfo.labelledPrice.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border-1 border-white shadow px-4 py-2 text-right">
                                        {(item.productInfo.labelledPrice - item.productInfo.price).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border-1 border-white shadow px-4 py-2 text-right">
                                        {item.productInfo.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )}
</Modal>


        </div>
    );
}
