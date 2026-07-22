import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const Cart = ({ setOpenCart, cart, setCart }) => {
  const [step, setStep] = useState(1); // 1: Confirm Items, 2: Delivery Details
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryTo, setDeliveryTo] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      status: "PENDING",
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
        setOpenCart(false);
        setCart([]);
        toast.success("Order Placed Successfully");
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

  const goToStep2 = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(2);
      setIsTransitioning(false);
    }, 300);
  };

  const goToStep1 = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setIsTransitioning(false);
    }, 300);
  };

  const subtotal = calculateSubtotal();
  const shipping = 0;
  const total = (parseFloat(subtotal) + parseFloat(shipping)).toFixed(2);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </span>
            <span className="hidden xs:inline">
              {step === 1 ? "Your Cart" : "Delivery Details"}
            </span>
            <span className="xs:hidden">
              {step === 1 ? "Cart" : "Details"}
            </span>
          </h2>
          <button
            onClick={() => setOpenCart(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl sm:text-2xl cursor-pointer p-1 hover:bg-gray-100 rounded-full w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${step >= 1 ? 'bg-blue-600 text-white scale-100' : 'bg-gray-300 text-gray-600 scale-95'}`}>
                1
              </div>
              <span className={`text-xs sm:text-sm transition-colors duration-300 ${step >= 1 ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                <span className="hidden xs:inline">Cart</span>
                <span className="xs:hidden">Items</span>
              </span>
            </div>
            <div className={`flex-1 h-0.5 mx-1 sm:mx-2 transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${step >= 2 ? 'bg-blue-600 text-white scale-100' : 'bg-gray-300 text-gray-600 scale-95'}`}>
                2
              </div>
              <span className={`text-xs sm:text-sm transition-colors duration-300 ${step >= 2 ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                <span className="hidden xs:inline">Details</span>
                <span className="xs:hidden">Info</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 relative">
          {/* Step 1: Cart Items */}
          <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'} ${step === 1 ? 'block' : 'hidden'}`}>
            <div className="space-y-4 mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Confirm Your Items</h3>

              {cart.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-base sm:text-lg font-medium text-gray-600">Your cart is empty</h3>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">Add some items to get started!</p>
                </div>
              ) : (
                cart.map((data, index) => (
                  <div
                    key={data.id || index}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-100 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                  >
                    <div className="w-full sm:w-20 h-40 sm:h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={data.img}
                        alt={data.product_name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                        {data.product_name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {data.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                        <span className="text-base sm:text-lg font-bold text-blue-600">
                          GHS {data.price}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDecreaseQuantity(data.id)}
                            className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm hover:scale-110 active:scale-95"
                          >
                            −
                          </button>
                          <span className="font-semibold w-6 text-center text-sm sm:text-base">
                            {data.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(data.id)}
                            className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm hover:scale-110 active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(data.id)}
                      className="text-red-400 hover:text-red-600 transition cursor-pointer hover:scale-110 active:scale-95 self-end sm:self-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 sm:size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Step 2: Delivery Details */}
          <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'} ${step === 2 ? 'block' : 'hidden'}`}>
            <div className="border-t border-gray-200 pt-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                Delivery Details
              </h3>

              <form className="space-y-4">
                {/* Customer Name */}
                <div className="animate-slideInUp">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="animate-slideInUp" style={{ animationDelay: '50ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Delivery Location */}
                <div className="animate-slideInUp" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryTo}
                    onChange={(e) => setDeliveryTo(e.target.value)}
                    placeholder="Enter delivery address"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="animate-slideInUp" style={{ animationDelay: '150ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="relative flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-checked:border-blue-600 has-checked:bg-blue-50 hover:scale-105 active:scale-95">
                      <input
                        type="radio"
                        name="payment"
                        value="MOMO"
                        onChange={() => setPaymentMethod("MOMO")}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="flex items-center gap-2 mr-12 sm:mr-20">
                        <span className="font-medium text-sm sm:text-base">Mobile Money</span>
                      </span>
                    </label>
                    <label className="relative flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-checked:border-blue-600 has-checked:bg-blue-50 hover:scale-105 active:scale-95">
                      <input
                        type="radio"
                        name="payment"
                        value="CASH"
                        onChange={() => setPaymentMethod("CASH")}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className="flex items-center gap-2 mr-12 sm:mr-20">
                        <span className="font-medium text-sm sm:text-base">Cash on Delivery</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="animate-slideInUp" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Add any special requests or delivery instructions..."
                    rows="3 sm:rows-4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none text-sm sm:text-base"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer - Cart Summary */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm sm:text-base text-gray-600">
              <span>Subtotal</span>
              <span>GHS {subtotal}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-blue-600">GHS {total}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
            {step === 2 && (
              <button
                onClick={goToStep1}
                className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 order-2 sm:order-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                <span className="text-sm sm:text-base">Back</span>
              </button>
            )}
            
            {step === 1 ? (
              <button
                onClick={goToStep2}
                disabled={cart.length === 0}
                className={`w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
                  cart.length === 0 ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
                }`}
              >
                <span className="text-sm sm:text-base">Review & Continue</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 order-1 sm:order-2"
              >
                <span>
                  {loading ? (
                    <div className="flex gap-4 items-center">
                      <span className="text-sm sm:text-base">Placing Order</span>
                      <div className="h-5 w-5 animate-spin rounded-full border-3 border-gray-100 border-t-transparent"></div>
                    </div>
                  ) : (
                    <span className="text-sm sm:text-base">Place Order</span>
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.4s ease forwards;
          opacity: 0;
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;