import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "../toast";
import { API_URL } from "../config";

const PRODUCT_CATEGORIES = [
  "Food&Drinks",
  "Electronics",
  "Housing&Furniture",
  "Books&Stationery",
  "Jewelries&Accessories",
  "Fitness&Sports",
  "Others",
];

const MAX_IMAGES = 6;

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  const parseJsonResponse = async (response) => {
    const text = await response.text();

    if (!text || !text.trim()) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      if (response.status === 404) {
        throw new Error("Create product API route was not found. Check your Laravel route.", { cause: error });
      }

      if (response.status === 401) {
        throw new Error("Your login session has expired. Please log in again.", { cause: error });
      }

      if (response.status === 403) {
        throw new Error("You are not authorized to create this product.", { cause: error });
      }

      if (response.status === 419) {
        throw new Error("Your session has expired. Please log in again.", { cause: error });
      }

      if (response.status === 422) {
        throw new Error("Some product information is invalid.", { cause: error });
      }

      if (response.status >= 500) {
        throw new Error("The server encountered an error while creating the product.", { cause: error });
      }

      throw new Error(`Server returned an invalid response (${response.status}).`, { cause: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setErrorText("");

    if (
      !productName.trim() ||
      price === "" ||
      quantity === "" ||
      !image ||
      !description.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (!Number.isFinite(parsedPrice) || !Number.isFinite(parsedQuantity)) {
      toast.error("Price and Stock Quantity must be valid numbers");
      return;
    }

    if (!Number.isInteger(parsedQuantity)) {
      toast.error("Stock quantity must be a whole number");
      return;
    }

    if (parsedPrice < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    if (parsedQuantity < 0) {
      toast.error("Stock quantity cannot be negative");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const cloudPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !cloudPreset) {
      console.error("Cloudinary configuration is missing:", { cloudName, cloudPreset });
      toast.error("Cloudinary configuration is missing. Check your .env file.");
      return;
    }

    setLoading(true);

    const uploadToCloudinary = async (file) => {
      if (!file) {
        throw new Error("No image selected");
      }

      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", cloudPreset);

      const cloudResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: cloudData,
        }
      );

      const responseText = await cloudResponse.text();

      let cloudResult;
      try {
        cloudResult = JSON.parse(responseText);
      } catch (error) {
        console.error("Cloudinary returned a non-JSON response:", responseText);
        throw new Error("Cloudinary returned an invalid response.", { cause: error });
      }

      if (!cloudResponse.ok) {
        console.error("Cloudinary upload failed:", cloudResult);
        throw new Error(cloudResult?.error?.message || "Couldn't upload image to Cloudinary.");
      }

      if (!cloudResult?.secure_url) {
        console.error("Cloudinary response did not contain secure_url:", cloudResult);
        throw new Error("Cloudinary did not return an image URL.");
      }

      return cloudResult.secure_url;
    };

    let uploadedMainImageUrl;
    let uploadedAdditionalImageUrls = [];

    try {
      uploadedMainImageUrl = await uploadToCloudinary(image);

      if (images.length > 0) {
        uploadedAdditionalImageUrls = await Promise.all(
          images.map((file) => uploadToCloudinary(file))
        );
      }
    } catch (error) {
      console.error("Cloudinary product image upload error:", error);
      toast.error(error?.message || "Couldn't upload product pictures.");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("product_name", productName.trim());
    formData.append("price", String(parsedPrice));
    formData.append("quantity", String(parsedQuantity));
    formData.append("status", status);

    if (category) {
      formData.append("category", category);
    }

    formData.append("img", uploadedMainImageUrl);

    uploadedAdditionalImageUrls.forEach((imageUrl) => {
      formData.append("images[]", imageUrl);
    });

    formData.append("description", description.trim());

    try {
      const response = await fetch(`${API_URL}/create-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        if (response.status === 422 && data?.errors) {
          const validationMessages = Object.values(data.errors)
            .flat()
            .join(" ");

          throw new Error(validationMessages || "Please check the product information.");
        }

        throw new Error(data?.message || `Failed to create product (${response.status}).`);
      }

      setSuccess(true);

      setProductName("");
      setPrice("");
      setQuantity("");
      setStatus("AVAILABLE");
      setCategory("");
      setImage(null);
      setImages([]);
      setDescription("");
      setErrorText("");

      document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
        fileInput.value = "";
      });

      toast.success(data?.message || "Product created successfully");

      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (error) {
      console.error("Product creation error:", error);
      setErrorText(error?.message || "Something went wrong while creating the product.");
      toast.error(error?.message || "Something went wrong while creating the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      e.target.value = "";
      setImage(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Main image must be less than 5MB.");
      e.target.value = "";
      setImage(null);
      return;
    }

    setImage(file);
  };

  const handleImagesChange = (e) => {
    const selectedImages = Array.from(e.target.files || []);

    if (selectedImages.length === 0) {
      return;
    }

    const invalidImage = selectedImages.find((file) => !file.type.startsWith("image/"));

    if (invalidImage) {
      toast.error("Only image files are allowed.");
      e.target.value = "";
      return;
    }

    const oversizedImage = selectedImages.find((file) => file.size > 5 * 1024 * 1024);

    if (oversizedImage) {
      toast.error("Each additional image must be less than 5MB.");
      e.target.value = "";
      return;
    }

    const totalImages = images.length + selectedImages.length;

    if (totalImages > MAX_IMAGES) {
      toast.error(`You can add a maximum of ${MAX_IMAGES} additional pictures.`);
      e.target.value = "";
      return;
    }

    setImages((prev) => [...prev, ...selectedImages]);
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleClear = () => {
    setProductName("");
    setPrice("");
    setQuantity("");
    setStatus("AVAILABLE");
    setCategory("");
    setImage(null);
    setImages([]);
    setDescription("");
    setSuccess(false);
    setErrorText("");

    document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
      fileInput.value = "";
    });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-2xl">
        <div className="flex justify-between items-start gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Add New Product</h2>

          <Link to="/products">
            <button
              type="button"
              className="cursor-pointer text-gray-500 hover:text-gray-700 p-1"
              aria-label="Close"
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

        {errorText && (
          <div className="w-full p-4 rounded-lg border border-red-400 bg-red-50 text-red-700 my-4">
            <h1 className="flex gap-2 items-center text-sm sm:text-base">
              {errorText}
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
                required
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
                <option value="OUT_OF_STOCK">Out of Stock</option>
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
                required
              />

              <p className="text-xs text-gray-500 mt-1">
                Upload an image less than 5MB.
              </p>

              {image && (
                <p className="text-xs text-green-600 mt-1 truncate">
                  Selected: {image.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Add More Pictures
              </label>

              <span className="text-xs text-gray-500">
                {images.length}/{MAX_IMAGES}
              </span>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              disabled={images.length === MAX_IMAGES}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              onChange={handleImagesChange}
            />

            <p className="mt-1 text-xs text-gray-500">
              Add up to 6 additional product pictures.
            </p>

            {images.length > 0 && (
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {images.map((file, index) => (
                  <li
                    key={`${file.name}-${file.lastModified}-${index}`}
                    className="flex min-w-0 items-center justify-between gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm"
                  >
                    <span className="truncate text-gray-700">{file.name}</span>

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700"
                      aria-label={`Remove ${file.name}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <select
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category (optional)</option>

              {PRODUCT_CATEGORIES.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
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
              disabled={loading}
              className={`flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex gap-4 items-center justify-center">
                  <h1>Creating</h1>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                "Add Product"
              )}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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