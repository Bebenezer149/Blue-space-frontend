import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const Cart = ({ setOpenCart, cart, setCart }) => {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryTo, setDeliveryTo] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const vendorId = cart.length > 0 ? cart[0].vendor_id : null;
    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));
    if (
      customer === "" ||
      phone === "" ||
      deliveryTo === "" ||
      notes === "" ||
      paymentMethod === ""
    ) {
      toast.error("Every field must be filled");
      setLoading(false);
      return;
    }
    const data = {
      vendor_id: vendorId,
      customer_name: customer,
      phone_number: phone,
      delivery_to: deliveryTo,
      additional_notes: notes,
      status: 'PENDING',
      payment_method: paymentMethod,
      items,
    };
    console.log(data);
    fetch(`${API_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        
        console.log(res);
        setLoading(false);
        setOpenCart(false)
        setCart([])
        toast.success("Order Placed Successfully")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to place order");
        setLoading(false);
      });
  }

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncreaseQuantity = (itemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const subtotal = calculateSubtotal();
  const shipping = 0;
  const total = (parseFloat(subtotal) + parseFloat(shipping)).toFixed(2);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </span>
            Your Cart
          </h2>
          <button
            onClick={() => setOpenCart(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Cart Items Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Order Items</h3>

            {cart.map((data, index) => (
              <div
                key={data.id || index}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-100 pb-4"
              >
                <div className="w-full sm:w-20 h-40 sm:h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={data.img}
                    alt={data.product_name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {data.product_name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                    <span className="text-lg font-bold text-blue-600">
                      GHS {data.price}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDecreaseQuantity(data.id)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm"
                      >
                        −
                      </button>
                      <span className="font-semibold w-6 text-center">
                        {data.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(data.id)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(data.id)}
                  className="text-red-400 hover:text-red-600 transition cursor-pointer"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Personal Details Form */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Delivery Details
            </h3>

            <form className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={deliveryTo}
                  onChange={(e) => setDeliveryTo(e.target.value)}
                  placeholder="Enter delivery address"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="relative flex  items-center justify-between  p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-checked:border-blue-600 has-checked:bg-blue-50">
                    <input
                      type="radio"
                      name="payment"
                      value="MOMO"
                      onChange={() => setPaymentMethod("MOMO")}
                    />
                    <span className="flex items-center gap-2">
                      <span className="font-medium">Mobile Money</span>
                    </span>
                  </label>
                  <label className="relative flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-checked:border-blue-600 has-checked:bg-blue-50">
                    <input
                      type="radio"
                      name="payment"
                      value="CASH"
                      onChange={() => setPaymentMethod("CASH")}
                      required
                    />
                    <span className="flex items-center gap-2">
                      <span className="font-medium">Cash</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Add any special requests or delivery instructions..."
                  rows="4"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer - Cart Summary */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>GHS {subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-blue-600">GHS {total}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? "Placing Order" : "Place Order"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
