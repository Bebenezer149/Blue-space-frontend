import { toast } from "react-toastify";

function ProductCard({ data, img, title, price, status, addToCart }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white w-full h-full flex flex-col">
      <div className="h-50 md:h-60 overflow-hidden bg-gray-100">
        <img
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          src={img}
          alt={title}
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {title || "Product Name"}
          </h1>
          <div
            className={`py-1 px-3 rounded-full text-xs font-semibold whitespace-nowrap ${
              status === "AVAILABLE"
                ? "bg-green-100 text-green-600"
                : status === "Out_Of_Stock"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
            }`}
          >
            <h1>{status || "Available"}</h1>
          </div>
        </div>
        <div className="mt-2 text-xl md:text-2xl font-bold text-blue-600">
          <h1>GH₵ {parseFloat(price).toFixed(2) || "0.00"}</h1>
        </div>
        <div className="mt-auto pt-3">
          <button
            onClick={() => {
              if (status === "Out_of_Stock") {
                toast.warning("This product is not available at the moment");
              } else {
                addToCart(data);
              }
            }}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
