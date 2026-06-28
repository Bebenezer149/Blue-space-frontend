import { useState } from "react";

function EditProduct({ setEditOpen, productDetails }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const data = {
    product_name: productName,
    price: price,
    quantity: quantity,
    description: description,
    status: status,
    image: image,
  };

  const token = localStorage.getItem("token");

  function updateProduct(e) {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);

    fetch(`http://127.0.0.1:8000/api/update-product?id=${productDetails.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        alert("Updated successfully");
        setLoading(false);
        setEditOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={() => setEditOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          >
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

        {/* Form */}
        <form onSubmit={updateProduct} className="p-6 space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="product_name"
              onChange={(e) => setProductName(e.target.value)}
              defaultValue={productDetails.product_name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (GH₵) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={productDetails.price}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                defaultValue={productDetails.quantity}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Status and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={productDetails.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep current image
              </p>
            </div>
          </div>

          {/* Current Image Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={productDetails.img}
                  alt="Current product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {productDetails.image_name || "product-image.jpg"}
                </span>
                <span className="text-xs text-gray-500">
                  {productDetails.image_size || "2.4 MB"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={productDetails.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all"
              placeholder="Enter product description"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              onClick={() => setEditOpen(false)}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;