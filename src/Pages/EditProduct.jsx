import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import { compressImage } from "../utils/compressImage";

function EditProduct({ setEditOpen, productDetails, onProductRefresh }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (productDetails) {
      setProductName(productDetails.product_name || "");
      setPrice(productDetails.price || "");
      setQuantity(productDetails.quantity || "");
      setDescription(productDetails.description || "");
      setStatus(productDetails.status || "Available");
    }
  }, [productDetails]);

  function updateProduct(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("product_name", productName || productDetails.product_name);
    formData.append("price", price || productDetails.price);
    formData.append("quantity", quantity || productDetails.quantity);
    formData.append("description", description || productDetails.description);
    formData.append("status", status || productDetails.status);

    if (image) {
      formData.append("img", image);
    }

    formData.append("_method", "PUT");

    fetch(`${API_URL}/update-product?id=${productDetails.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.status === 413) {
          throw new Error("Image is too large. Try a smaller photo.");
        }

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok) {
          if (contentType.includes("application/json")) {
            const data = await res.json();
            throw new Error(data.message || "Failed to update product");
          }
          throw new Error(`Server error (${res.status}). Please try again.`);
        }

        return res.json();
      })
      .then((res) => {
        console.log(res);
        toast.success("Product updated successfully!");
        setLoading(false);
        if (onProductRefresh) {
          onProductRefresh();
        }
        setEditOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message || "Failed to update product");
        setLoading(false);
      });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }

    setCompressing(true);
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
      setImagePreview(URL.createObjectURL(compressed));
    } catch (err) {
      toast.error(err.message || "Failed to process image");
      e.target.value = "";
      setImage(null);
      setImagePreview(null);
    } finally {
      setCompressing(false);
    }
  };

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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              >
                <option value="Available">Available</option>
                <option value="Out_Of_Stock">Out_Of_Stock</option>
               
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                {compressing
                  ? "Compressing image..."
                  : "Leave empty to keep current image — large photos are compressed automatically"}
              </p>
            </div>
          </div>

          {/* Image Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {imagePreview ? "New Image Preview" : "Current Image"}
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                {imagePreview || productDetails.img ? (
                  <img
                    src={imagePreview || productDetails.img}
                    alt={imagePreview ? "New product image" : "Current product"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                {imagePreview ? (
                  <>
                    <span className="text-sm font-medium text-green-600">
                      ✓ New image selected
                    </span>
                    <span className="text-xs text-gray-500">
                      Ready to upload
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium text-gray-700">
                      {productDetails.image_name || "product-image.jpg"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {productDetails.image_size || "2.4 MB"}
                    </span>
                  </>
                )}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </span>
              ) : (
                "Update Product"
              )}
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