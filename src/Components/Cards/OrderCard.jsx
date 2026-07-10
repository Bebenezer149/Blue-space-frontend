import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

function OrderCard({ order, clearCard, setIsOpen, setOrderDetails, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);
  
  // Check if button should be disabled - includes CANCELLED status
  const disable = currentStatus === "DELIVERED" || 
                  currentStatus === "CANCELLED" || 
                  isUpdating;
  
  const token = localStorage.getItem("token");

  function deliveredStatus() {
    if (isUpdating || disable) return;
    
  
    
    setIsUpdating(true);
    const deliveredStatus = {
      id: order.id,
      status: "DELIVERED",
    };
    
    fetch(`${API_URL}/update-status?id=${deliveredStatus.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deliveredStatus),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.message) {
          setCurrentStatus("DELIVERED");
          if (onStatusUpdate) {
            onStatusUpdate(order.id, "DELIVERED");
          }
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error("Failed to update status. Please try again.");
      })
      .finally(() => {
        setTimeout(() => setIsUpdating(false), 500);
      });
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 relative">
      {/* Close button - positioned at top right corner */}
      <button
        onClick={() => clearCard(order.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 cursor-pointer z-10"
        aria-label="Close order card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-3 flex-1">
          <div>
            <h2 className="font-bold text-base sm:text-lg pr-10">
              {currentStatus === "DELIVERED" 
                ? " Order Delivered" 
                : currentStatus === "CANCELLED"
                  ? " Order Cancelled"
                  : " Order Received"}
            </h2>
            <p className="text-gray-500 text-sm">Order #{order.id}</p>
          </div>

          <div className="space-y-1 text-gray-700">
            <p className="text-sm text-gray-700 truncate">
              <span className="font-semibold">Customer:</span>{" "}
              {order.customer_name}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Phone:</span> {order.phone_number}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Total:</span>{" "}
              <span className="font-bold text-blue-600">GH₵ {order.total_amount}</span>
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Status + Actions */}
        <div className="flex flex-col items-start lg:items-end gap-4 lg:flex-shrink-0">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500 ${
              currentStatus === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : currentStatus === "CONFIRMED"
                  ? "bg-blue-100 text-blue-700"
                  : currentStatus === "DELIVERED"
                    ? "bg-green-100 text-green-700 scale-105"
                    : currentStatus === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
            }`}
          >
            {currentStatus}
            {isUpdating && " ..."}
          </span>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                setIsOpen(true);
                setOrderDetails(order);
              }}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              View
            </button>

            <button
              onClick={deliveredStatus}
              disabled={disable}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                disable
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-green-600 hover:bg-green-700 hover:scale-105 hover:shadow-md cursor-pointer text-white"
              }`}
            >
              {isUpdating ? "Updating..." : "Delivered"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;