import { useState } from "react";

function getVariantImages(productDetails) {
  if (Array.isArray(productDetails.product_image)) {
    return productDetails.product_image
      .map((image) => image?.secondary_url)
      .filter((image) => typeof image === "string" && image);
  }

  const images = productDetails.variant ?? productDetails.images ?? [];
  if (Array.isArray(images)) {
    return images.filter((image) => typeof image === "string" && image);
  }

  if (typeof images === "string" && images) {
    try {
      const parsedImages = JSON.parse(images);
      if (Array.isArray(parsedImages)) {
        return parsedImages.filter((image) => typeof image === "string" && image);
      }
    } catch {
      return [images];
    }
  }

  return [];
}

function ViewProduct({ productDetails, setViewOpen }) {
  const variantImages = getVariantImages(productDetails);
  const images = [productDetails.img, ...variantImages].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(productDetails.img);
  const activeImage = images.includes(selectedImage) ? selectedImage : productDetails.img;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
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
                src={activeImage}
                alt={`${productDetails.product_name || "Product"} image`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View ${index === 0 ? "main" : `additional`} product image ${index + 1}`}
                  aria-pressed={activeImage === image}
                  className={`overflow-hidden rounded-lg border-2 ${activeImage === image ? "border-blue-500" : "border-gray-200"}`}
                >
                  <img
                    src={image}
                    alt={`${productDetails.product_name || "Product"} image ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

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
              <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${productDetails.status === "AVAILABLE" ? " bg-green-100 text-green-700":"bg-yellow-100 text-yellow-700"}`}>
               {productDetails.status ==="OUT_OF_STOCK" ? "Out of Stock":"Available"}
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

         
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
          
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
