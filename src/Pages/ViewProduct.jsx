function ViewProduct({productDetails, setViewOpen}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">View Product</h2>
          <button onClick={()=>setViewOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 hover:text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="w-48 sm:w-60 h-48 sm:h-60 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
              <img
                src={productDetails.img}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Product Name
              </label>
              <p className="text-lg font-semibold text-gray-800">{productDetails.product_name}</p>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Price
              </label>
              <p className="text-2xl font-bold text-blue-600">GH₵ {productDetails.price}</p>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Stock Quantity
              </label>
              <p className="text-gray-800 font-medium">{productDetails.quantity}</p>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Status
              </label>
              <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
               {productDetails.status}
              </span>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Description
              </label>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
               {productDetails.description}
              </p>
            </div>

            {/* Date Added */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Date Added
              </label>
              <p className="text-gray-600">{ productDetails.created_at ? new Date(productDetails.created_at).toLocaleDateString(): "Couldn't display date"}</p>
            </div>

            {/* Product ID */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Product ID
              </label>
              <p className="text-gray-600 text-sm font-mono">{productDetails.id}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
          
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer order-1 sm:order-2">
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;