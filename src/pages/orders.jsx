import {
  ChevronLeftIcon,
  ClockIcon,
  EyeIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { allOrders } from "../constants/orders";

const OrdersManagement = () => {
  const [orders, setOrders] = useState(allOrders);

  const [open, setOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOpen(!open);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder(null);
    setOpen(false);
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Link className="font-extrabold text-blue-600 flex items-center gap-1" to="/">
          <ChevronLeftIcon className="h-6 w-6" />
          <p className="tracking-widest">Back</p>
        </Link>
        <h2 className="text-2xl w-64 m-auto font-bold mb-4 mt-3 text-center text-white bg-red-600 p-3">Manage Orders</h2>
        
      <div className="overflow-x-scroll my-8">
        <table className="min-w-full border border-gray-300">
          <thead className="text-white">
            <tr className="bg-gray-500">
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Order Date</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-2 px-4 border">{order.orderID}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                <td className="py-2 px-4 border">{order.orderDate}</td>
                <td className="py-2 px-4 border">{order.status}</td>
                <td className="py-2 px-4 border flex flex-col md:flex-row gap-8 justify-center">
                  <button
                    onClick={() => viewOrderDetails(order)}
                    className="bg-blue-500 text-white px-2 py-1 m-2 rounded hover:bg-blue-700 flex items-center gap-2 w-fit h-fit"
                  >
                    <EyeIcon className="h-6 w-6 md:h-4 md:w-4" /> View
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, "Delivered")}
                    className="bg-green-500 text-white px-2 py-1 m-2 rounded hover:bg-green-700 flex items-center gap-2 w-fit h-fit"
                  >
                    {order.status === "Processing" ? (
                      <ClockIcon className="h-6 w-6 md:h-4 md:w-4" />
                    ) : (
                      <ShoppingBagIcon className="h-6 w-6 md:h-4 md:w-4" />
                    )}
                    {order.status}
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-2 py-1 m-2 rounded hover:bg-red-700 flex items-center gap-2 w-fit h-fit"
                  >
                    <TrashIcon className="h-6 w-6 md:h-4 md:w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && open && (
        <div className="mt-4 p-4 bg-transparent border rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2 text-center">Order Details</h3>

          <div className="w-full h-11 mb-3 flex items-center justify-center gap-3">
            <p className="w-64 h-full bg-orange-500 text-white flex items-center justify-center">Order ID: &nbsp;<span className="font-bold">{selectedOrder.orderID}</span></p>
            <p className="w-64 h-full bg-orange-500 text-white flex items-center justify-center">Customer Name: &nbsp;<span className="font-bold">{selectedOrder.customerName}</span></p>
          </div>
          <div className="w-full h-11 mb-3 flex items-center justify-center gap-3">
            <p className="w-64 h-full bg-orange-500 text-white flex items-center justify-center">Order Date: &nbsp;<span className="font-bold">{selectedOrder.orderDate}</span></p>
            <p className="w-64 h-full bg-orange-500 text-white flex items-center justify-center">Order Status: &nbsp;<span className="font-bold">{selectedOrder.status}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
