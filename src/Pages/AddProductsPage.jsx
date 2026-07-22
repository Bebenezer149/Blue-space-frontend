import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [image, setImage] = useState(null);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setErrorMessage(false);
    setDisable(false);

    // Image is required
    if (!productName || !price || !quantity || !image || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedQuantity)) {
      toast.error("Price and Stock Quantity must be valid numbers");
      return;
    }

    setLoading(true);

    let uploadedImageUrl = "";
    if (image) {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const cloudPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const cloudData = new FormData();
      cloudData.append("file", image);
      cloudData.append("upload_preset", cloudPreset);

      try {
        const cloudResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: cloudData,
          },
        );

        const res = await cloudResponse.json();

        if (!cloudResponse.ok || !res?.secure_url) {
          throw new Error("Couldn't upload to Cloudinary");
        }

        uploadedImageUrl = res.secure_url;
      } catch (err) {
        console.log(err);
        toast.error("Couldn't upload image");
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("price", String(parsedPrice));
    formData.append("quantity", String(parsedQuantity));
    formData.append("status", status);
    if (uploadedImageUrl) formData.append("img", uploadedImageUrl);
    formData.append("description", description);

    try {
      const res = await fetch(`${API_URL}/create-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 413) {
        throw new Error("Image is too large. Try a smaller photo.");
      }

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const data = await res.json();
          throw new Error(data.message || "Failed to create product");
        }
        throw new Error(`Server error (${res.status}). Please try again.`);
      }

      await res.json();

      setSuccess(true);
      setLoading(false);
      setDisable(true);

      setProductName("");
      setPrice("");
      setQuantity("");
      setStatus("Available");
      setImage(null);
      setDescription("");

      navigate("/products");
      toast.success("Product created");

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.message || "Something went wrong");
      setErrorMessage(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      return;
    }

    setImage(file);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-2xl">
        <div className="flex justify-between items-start gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Add New Product
          </h2>

          <Link to={"/products"}>
            <button className="cursor-pointer text-gray-500 hover:text-gray-700 p-1">
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
          </Link>
        </div>

        {success && (
          <div className="w-full p-4 rounded-lg border border-green-400 bg-green-50 text-green-700 my-4">
            <h1 className="flex gap-2 items-center justify-between text-sm sm:text-base">
              Product Added Successfully
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
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </h1>
          </div>
        )}

        {errorMessage && (
          <div className="w-full p-4 rounded-lg border border-red-400 bg-red-50 text-red-700 my-4">
            <h1 className="flex gap-2 items-center text-sm sm:text-base">
              Something went wrong
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </h1>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (GH₵)
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="AVAILABLE">Available</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an image less than 5MB (optional)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={disable}
              className={`flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                disable ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className=" flex gap-4 items-center justify-center">
                  <h1>Creating</h1>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                "Add Product"
              )}
            </button>

            <button
              type="reset"
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              onClick={() => {
                setProductName("");
                setPrice("");
                setQuantity("");
                setStatus("Available");
                setImage(null);
                setDescription("");

                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = "";
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
