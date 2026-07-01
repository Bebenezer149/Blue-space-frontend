const Cart = ({setOpenCart}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
      {/* Cart Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">🛒</span>
            Your Cart
          </h2>
          <button onClick={()=>setOpenCart(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl">
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Cart Items Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Order Items</h3>

            {/* Item 1 */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  Wireless Headphones
                </h3>
                <p className="text-sm text-gray-500">Black, Premium Edition</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    $89.99
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      −
                    </button>
                    <span className="font-semibold w-6 text-center">2</span>
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-600 transition">
                🗑️
              </button>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Smart Watch</h3>
                <p className="text-sm text-gray-500">Silver, Series 5</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    $199.99
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      −
                    </button>
                    <span className="font-semibold w-6 text-center">1</span>
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-600 transition">
                🗑️
              </button>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 pb-2">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">USB-C Cable</h3>
                <p className="text-sm text-gray-500">2m, Braided</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    $19.99
                  </span>
                  <div className="flex items-center gap-3">
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      −
                    </button>
                    <span className="font-semibold w-6 text-center">3</span>
                    <button className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-sm">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-600 transition">
                
              </button>
            </div>
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
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative flex items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      className="sr-only"
                      defaultChecked
                    />
                    <span className="flex items-center gap-2">
                      <span className="font-medium">Mobile Money</span>
                    </span>
                  </label>
                  <label className="relative flex items-center justify-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      className="sr-only"
                    />
                    <span className="flex items-center gap-2">
                      <span className="font-medium">Cash</span>
                    </span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer - Cart Summary */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>$309.97</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="text-blue-600">$309.97</span>
            </div>
          </div>

          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2">
            <span>Place Order</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
