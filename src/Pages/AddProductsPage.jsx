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

  // File objects are stored here.
  // The actual <input type="file"> elements are NOT controlled.
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setErrorMessage(false);

    /*
     * Basic validation
     */
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

    if (
      Number.isNaN(parsedPrice) ||
      Number.isNaN(parsedQuantity)
    ) {
      toast.error("Price and Stock Quantity must be valid numbers");
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

    /*
     * Cloudinary configuration
     */
    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const cloudPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !cloudPreset) {
      console.error("Cloudinary configuration is missing:", {
        cloudName,
        cloudPreset,
      });

      toast.error(
        "Cloudinary configuration is missing. Check your .env file."
      );

      return;
    }

    setLoading(true);

    /*
     * Upload one image to Cloudinary
     */
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

      /*
       * Read the response as text first.
       *
       * This prevents:
       * Unexpected token '<'
       *
       * if Cloudinary happens to return HTML.
       */
      const responseText = await cloudResponse.text();

      let cloudResult;

      try {
        cloudResult = JSON.parse(responseText);
      } catch (error) {
        console.error(
          "Cloudinary returned a non-JSON response:",
          responseText
        );

        throw new Error(
          "Cloudinary returned an invalid response."
        );
      }

      if (!cloudResponse.ok) {
        console.error(
          "Cloudinary upload failed:",
          cloudResult
        );

        throw new Error(
          cloudResult?.error?.message ||
            "Couldn't upload image to Cloudinary."
        );
      }

      if (!cloudResult?.secure_url) {
        console.error(
          "Cloudinary response did not contain secure_url:",
          cloudResult
        );

        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      return cloudResult.secure_url;
    };

    /*
     * Upload all product pictures
     */
    let uploadedMainImageUrl = "";
    let uploadedAdditionalImageUrls = [];

    try {
      /*
       * Upload the main product image
       */
      uploadedMainImageUrl =
        await uploadToCloudinary(image);

      /*
       * Upload the additional images.
       *
       * Promise.all allows the uploads to happen
       * concurrently.
       */
      if (images.length > 0) {
        uploadedAdditionalImageUrls =
          await Promise.all(
            images.map((file) =>
              uploadToCloudinary(file)
            )
          );
      }
    } catch (error) {
      console.error(
        "Cloudinary product image upload error:",
        error
      );

      toast.error(
        error?.message ||
          "Couldn't upload product pictures."
      );

      setLoading(false);
      return;
    }

    /*
     * Prepare data for Laravel
     */
    const formData = new FormData();

    formData.append(
      "product_name",
      productName.trim()
    );

    formData.append(
      "price",
      String(parsedPrice)
    );

    formData.append(
      "quantity",
      String(parsedQuantity)
    );

    formData.append(
      "status",
      status
    );

    if (category) {
      formData.append(
        "category",
        category
      );
    }

    /*
     * Main product image.
     *
     * Laravel will store this in:
     * products.img
     */
    formData.append(
      "img",
      uploadedMainImageUrl
    );

    /*
     * Additional product images.
     *
     * IMPORTANT:
     * This must be images[] because the Laravel
     * controller validates:
     *
     * images => array
     * images.* => url
     */
    uploadedAdditionalImageUrls.forEach(
      (imageUrl) => {
        formData.append(
          "images[]",
          imageUrl
        );
      }
    );

    formData.append(
      "description",
      description.trim()
    );

    /*
     * Send product to Laravel
     */
    try {
      const response = await fetch(
        `${API_URL}/create-product`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },

          body: formData,
        }
      );

      /*
       * Read the response as text first.
       *
       * This is important because if Laravel returns
       * an HTML error page, calling response.json()
       * directly causes:
       *
       * Unexpected token '<'
       */
      const responseText =
        await response.text();

      console.log(
        "Create Product Status:",
        response.status
      );

      console.log(
        "Create Product Response:",
        responseText
      );

      let data = null;

      /*
       * Try to convert Laravel response into JSON.
       */
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (error) {
          console.error(
            "Laravel returned non-JSON response:",
            responseText
          );

          if (response.status === 404) {
            throw new Error(
              "Create product API route was not found. Check your Laravel route."
            );
          }

          if (response.status === 401) {
            throw new Error(
              "Your login session has expired. Please log in again."
            );
          }

          if (response.status === 403) {
            throw new Error(
              "You are not authorized to create this product."
            );
          }

          if (response.status === 419) {
            throw new Error(
              "Your session has expired. Please log in again."
            );
          }

          if (response.status === 422) {
            throw new Error(
              "Some product information is invalid."
            );
          }

          if (response.status >= 500) {
            throw new Error(
              "The server encountered an error while creating the product."
            );
          }

          throw new Error(
            `Server returned an invalid response (${response.status}).`
          );
        }
      }

      /*
       * Handle HTTP errors
       */
      if (!response.ok) {
        console.error(
          "Product creation failed:",
          data
        );

        /*
         * Laravel validation errors
         */
        if (
          response.status === 422 &&
          data?.errors
        ) {
          const validationMessages =
            Object.values(data.errors)
              .flat()
              .join(" ");

          throw new Error(
            validationMessages ||
              "Please check the product information."
          );
        }

        throw new Error(
          data?.message ||
            `Failed to create product (${response.status}).`
        );
      }

      /*
       * Product created successfully
       */
      console.log(
        "Product created successfully:",
        data
      );

      setSuccess(true);

      /*
       * Reset all React state
       */
      setProductName("");
      setPrice("");
      setQuantity("");
      setStatus("AVAILABLE");
      setCategory("");
      setImage(null);
      setImages([]);
      setDescription("");

      /*
       * IMPORTANT:
       *
       * We only clear file inputs by setting their
       * value to an empty string.
       *
       * We NEVER set:
       *
       * value={image}
       *
       * on a file input.
       */
      document
        .querySelectorAll(
          'input[type="file"]'
        )
        .forEach((fileInput) => {
          fileInput.value = "";
        });

      toast.success(
        data?.message ||
          "Product created successfully"
      );

      /*
       * Give the success toast a moment to appear
       * before navigating.
       */
      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (error) {
      console.error(
        "Product creation error:",
        error
      );

      setErrorMessage(true);

      toast.error(
        error?.message ||
          "Something went wrong while creating the product."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Main image handler
   */
  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    /*
     * Basic file validation
     */
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select an image file."
      );

      e.target.value = "";
      setImage(null);
      return;
    }

    /*
     * 5MB limit
     */
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Main image must be less than 5MB."
      );

      e.target.value = "";
      setImage(null);
      return;
    }

    setImage(file);
  };

  /*
   * Additional images handler
   */
  const handleImagesChange = (e) => {
    const selectedImages =
      Array.from(
        e.target.files || []
      );

    if (selectedImages.length === 0) {
      return;
    }

    /*
     * Validate every selected image
     */
    const invalidImage =
      selectedImages.find(
        (file) =>
          !file.type.startsWith("image/")
      );

    if (invalidImage) {
      toast.error(
        "Only image files are allowed."
      );

      e.target.value = "";
      return;
    }

    /*
     * Check image sizes
     */
    const oversizedImage =
      selectedImages.find(
        (file) =>
          file.size > 5 * 1024 * 1024
      );

    if (oversizedImage) {
      toast.error(
        "Each additional image must be less than 5MB."
      );

      e.target.value = "";
      return;
    }

    /*
     * Combine previously selected images
     * with newly selected images.
     */
    const updatedImages = [
      ...images,
      ...selectedImages,
    ];

    /*
     * Maximum of 6 additional images
     */
    if (
      updatedImages.length >
      MAX_IMAGES
    ) {
      toast.error(
        `You can add a maximum of ${MAX_IMAGES} additional pictures.`
      );

      /*
       * Clear the file input.
       *
       * This is allowed because we're setting
       * it to an empty string.
       */
      e.target.value = "";

      return;
    }

    setImages(updatedImages);

    /*
     * Clear the input so the user can select
     * the same file again if necessary.
     */
    e.target.value = "";
  };

  /*
   * Remove an additional image
   */
  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  /*
   * Clear form
   */
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
    setErrorMessage(false);

    /*
     * File inputs can safely be reset
     * to an empty string.
     */
    document
      .querySelectorAll(
        'input[type="file"]'
      )
      .forEach((fileInput) => {
        fileInput.value = "";
      });
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-2xl">

        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-6">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Add New Product
          </h2>

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

        {/* Success message */}
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

        {/* Error message */}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
              onChange={(e) =>
                setProductName(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Price */}
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
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* Quantity */}
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
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                required
              />

            </div>

          </div>

          {/* Status + Main Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Status */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>

              <select
                name="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option value="AVAILABLE">
                  Available
                </option>

                <option value="OUT_OF_STOCK">
                  Out of Stock
                </option>
              </select>

            </div>

            {/* Main Image */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>

              {/*
                 IMPORTANT:

                 There is NO value prop here.

                 DO NOT add:

                 value={image}

                 to a file input.
               */}
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

          {/* Additional Images */}
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
              disabled={
                images.length ===
                MAX_IMAGES
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              onChange={handleImagesChange}
            />

            <p className="mt-1 text-xs text-gray-500">
              Add up to 6 additional product pictures.
            </p>

            {/* Selected additional images */}
            {images.length > 0 && (
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">

                {images.map(
                  (file, index) => (
                    <li
                      key={`${file.name}-${file.lastModified}-${index}`}
                      className="flex min-w-0 items-center justify-between gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm"
                    >

                      <span className="truncate text-gray-700">
                        {file.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700"
                        aria-label={`Remove ${file.name}`}
                      >
                        Remove
                      </button>

                    </li>
                  )
                )}

              </ul>
            )}

          </div>

          {/* Category */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <select
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option value="">
                Select a category (optional)
              </option>

              {PRODUCT_CATEGORIES.map(
                (categoryOption) => (
                  <option
                    key={categoryOption}
                    value={categoryOption}
                  >
                    {categoryOption}
                  </option>
                )
              )}

            </select>

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
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
            />

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >

              {loading ? (
                <div className="flex gap-4 items-center justify-center">

                  <h1>
                    Creating
                  </h1>

                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>

                </div>
              ) : (
                "Add Product"
              )}

            </button>

            {/* Clear */}
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