import { Link } from "react-router-dom";
import { useState } from "react";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Available");
  const [image, setImage] = useState(""); // Will store base64 string
  const [imagePreview, setImagePreview] = useState(""); // For preview
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [success, setSuccess]= useState(false)
  const [errorMessage, setErrorMessage]=useState(false)

  const data = {
    product_name: productName,
    price: price,
    quantity: quantity,
    status: status,
    img: image, // This will be the base64 string
    description: description,
  };

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://127.0.0.1:8000/api/create-product", {
      method: "POST",
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
        setSuccess(true)
        setLoading(false);
        setDisable(true);
        setProductName("");
        setPrice("");
        setQuantity("");
        setStatus("Available");
        setImage("");
        setImagePreview("");
        setDescription("");
        // Reset file input
        document.querySelector('input[type="file"]').value = "";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorMessage(true)
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = "";
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a valid image (JPEG, PNG, GIF, WEBP)");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String); // Store base64 for API
        setImagePreview(base64String); // Store base64 for preview
        console.log("Image converted to base64");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl justify-between">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Product
          </h2>
          <Link to={"/products"}>
            <button className="mb-6 cursor-pointer font-bold">
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

        {
           success && (
          <div className="p-2 mx-32 border w-1/2   rounded-lg border-green-500 bg-green-200  text-green-500 my-4">
            <h1 className="flex gap-2 justify-between">
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
           )
        }
        {
            errorMessage && (
          <div className="p-2 border mx-32 w-1/2  rounded-lg border-red-500 bg-red-200  text-red-500">
            <h1 className="flex gap-2">
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
        )
        }

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
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

          {/* Price and Quantity */}
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

          {/* Status and Image */}
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
                <option value="Available">Available</option>
              
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
                Accepted formats: JPEG, PNG, JPG, GIF, WEBP (Max 5MB)
              </p>
              
              {/* Image Preview - Fixed */}
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Image selected
                  </p>
                </div>
              )}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={disable}
              className={`flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                disable ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Add Product"}
            </button>

            <button
              type="reset"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              onClick={() => {
                setProductName("");
                setPrice("");
                setQuantity("");
                setStatus("Available");
                setImage("");
                setImagePreview("");
                setDescription("");
                document.querySelector('input[type="file"]').value = "";
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