import { useState, useEffect } from "react";

function ViewOrder({ setIsOpen, orderDetails }) {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch order details
  const fetchOrderDetails = () => {
    fetch(`http://127.0.0.1:8000/api/get-one-order?id=${orderDetails.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Full API Response:", res);
        setOrder(res.order_details);
        setStatus(res.order_details.status);

        // Get items from response
        const itemsData = res.order_details?.items || [];

        if (Array.isArray(itemsData) && itemsData.length > 0) {
          setItems(itemsData);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  // Update disable state when status changes
  useEffect(() => {
    if (status !== 'PENDING') {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [status]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  function confirmStatus() {
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    const confirmedStatus = {
      id: orderDetails.id,
      status: "CONFIRMED" // Use uppercase to match backend enum
    };
    
    fetch(`http://127.0.0.1:8000/api/update-status?id=${orderDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(confirmedStatus)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          setSuccess(true);
          setMessage(res.message || "Order Confirmed Successfully");
          // Update the status
          setStatus("CONFIRMED");
          // Refresh order details
          fetchOrderDetails();
          // Close modal after success (optional)
          // setTimeout(() => setIsOpen(false), 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setMessage("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function cancelledStatus() {
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    const cancelledStatus = {
      id: orderDetails.id,
      status: "CANCELLED" // Use uppercase to match backend enum
    };
    
    fetch(`http://127.0.0.1:8000/api/update-status?id=${orderDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cancelledStatus)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message) {
          setSuccess(true);
          setMessage(res.message || "Order Cancelled Successfully");
          // Update the status
          setStatus("CANCELLED");
          // Refresh order details
          fetchOrderDetails();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setMessage("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-[95vw] p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-gray-800">Order Details</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-500 hover:text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">
            Order #ORD-{order.id}
          </span>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : status === "CONFIRMED"
                  ? "bg-blue-100 text-blue-700"
                  : status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
            }`}
          >
            {status || "PENDING"}
          </span>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Order Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Customer Name
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.customer_name}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Phone Number
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.phone_number}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Amount
            </label>
            <p className="text-blue-600 font-bold text-lg mt-1">
              GH₵ {order.total_amount}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.created_at
                ? new Date(order.created_at).toLocaleString()
                : "N/A"}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Payment Method
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.payment_method || "Not specified"}
            </p>
          </div>

          {/* Delivery Location */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Delivery Location
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.delivery_to || "Not specified"}
            </p>
          </div>

          {/* Items Bought */}
          <div className="bg-gray-50 rounded-lg p-4 col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Items Bought
            </label>
            <div className="mt-2">
              {items && items.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {items.map((item, index) => (
                    <li key={index} className="text-gray-800 font-medium">
                      {item.product?.product_name || item.name || item.product_name || `Item ${index + 1}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items found</p>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-gray-50 rounded-lg p-4 col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Additional Notes
            </label>
            <p className="text-gray-800 font-medium mt-1">
              {order.additional_notes || "No additional notes"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={cancelledStatus}
            disabled={disable || loading}
            className={`px-6 py-2 border rounded-lg transition-colors cursor-pointer font-medium ${
              disable || loading
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-red-300 text-red-600 hover:bg-red-50"
            }`}
          >
            {loading ? "Processing..." : "Reject"}
          </button>
          <button
            disabled={disable || loading}
            onClick={confirmStatus}
            className={`px-6 py-2 rounded-lg transition-colors cursor-pointer font-medium ${
              disable || loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;