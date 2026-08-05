import { toast } from "react-toastify";

function ProductCard({
  data,
  img,
  title,
  price,
  status,
  addToCart,
  setOpenViewCard,
  setViewProductDetails,
}) {
  const isOutOfStock =
    status === "OUT_OF_STOCK" || status === "Out_Of_Stock" || Number(data.quantity) <= 0;

  return (
    <div className="surface-card group border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 bg-white w-full h-full flex flex-col hover:-translate-y-1">
      <div
        className="relative h-52 md:h-60 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => {
          if (setOpenViewCard && setViewProductDetails) {
            setViewProductDetails(data);
            setOpenViewCard(true);
          }
        }}
      >
        <img
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={img}
          alt={title}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
        <div className={`absolute top-3 right-3 py-1.5 px-3 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${isOutOfStock ? "bg-red-500/95 text-white" : "bg-emerald-500/95 text-white"}`}>
          {isOutOfStock ? "Out of stock" : "Available"}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate tracking-tight">
            {title || "Product Name"}
          </h1>
        </div>
        <div className="mt-2 text-xl md:text-2xl font-bold text-blue-600">
          <h1>GH₵ {parseFloat(price).toFixed(2) || "0.00"}</h1>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          {Math.max(0, Number(data.quantity) || 0)} in stock
        </div>
        <div className="mt-auto pt-3">
          <button
            disabled={isOutOfStock}
            onClick={() => {
              if (isOutOfStock) {
                toast.warning("This product is not available at the moment");
              } else {
                addToCart(data);
              }
            }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:shadow-lg enabled:hover:shadow-blue-500/25"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
