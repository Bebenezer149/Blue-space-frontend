import { useState } from "react";

function getVariantImages(productDetails) {
  const rawVariants = productDetails.variant ?? productDetails.variants;

  if (!rawVariants) return [];

  let variants = rawVariants;
  if (typeof rawVariants === "string") {
    try {
      variants = JSON.parse(rawVariants);
    } catch {
      variants = [rawVariants];
    }
  }

  return (Array.isArray(variants) ? variants : [variants])
    .map((variant) => (typeof variant === "string" ? variant : variant?.url || variant?.img || variant?.image))
    .filter(Boolean);
}

function VariantGallery({ variants }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = variants[activeIndex] || variants[0];

  return (
    <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">Product variants</p>
          <p className="mt-0.5 text-xs text-slate-500">Additional product views</p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100">
          {variants.length} {variants.length === 1 ? "image" : "images"}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white bg-white shadow-sm">
        <img src={activeImage} alt={`Product variant ${activeIndex + 1}`} className="h-52 w-full object-cover sm:h-64" />
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-hide" aria-label="Product variant images">
        {variants.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:h-20 sm:w-20 ${
              index === activeIndex
                ? "scale-105 border-blue-600 shadow-md shadow-blue-200"
                : "border-white opacity-70 hover:opacity-100"
            }`}
            aria-label={`View variant ${index + 1}`}
            aria-pressed={index === activeIndex}
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
            <span className={`absolute inset-x-0 bottom-0 bg-slate-950/60 py-0.5 text-[10px] font-semibold text-white transition-opacity ${index === activeIndex ? "opacity-100" : "opacity-0"}`}>
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ViewProduct({productDetails, setViewOpen}) {
  const variantImages = getVariantImages(productDetails);

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
                src={productDetails.img}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {variantImages.length > 0 && <VariantGallery key={productDetails.id} variants={variantImages} />}

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
