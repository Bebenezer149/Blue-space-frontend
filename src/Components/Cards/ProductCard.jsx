import { toast } from "../../toast";

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
    <div className="surface-card group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_28px_rgba(37,99,235,0.14)] sm:rounded-2xl">
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100 sm:aspect-[4/3]"
        onClick={() => {
          if (setOpenViewCard && setViewProductDetails) {
            setViewProductDetails(data);
            setOpenViewCard(true);
          }
        }}
      >
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          src={img}
          alt={title}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/35 to-transparent" />
        <div className={`absolute left-2 top-2 max-w-[calc(100%-1rem)] rounded-full px-2 py-1 text-[9px] font-bold leading-none shadow-sm backdrop-blur-md sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs ${isOutOfStock ? "bg-red-500/95 text-white" : "bg-emerald-500/95 text-white"}`}>
          {isOutOfStock ? "Out of stock" : "Available"}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <div className="min-h-10 sm:min-h-12">
          <h1 className="line-clamp-2 text-sm font-bold leading-5 text-slate-800 sm:text-lg sm:leading-6">
            {title || "Product Name"}
          </h1>
        </div>
        <div className="mt-1 text-base font-bold text-blue-600 sm:mt-2 sm:text-xl md:text-2xl">
          GH₵ {parseFloat(price).toFixed(2) || "0.00"}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-slate-500 sm:mt-3 sm:gap-2 sm:text-xs">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isOutOfStock ? "bg-red-400" : "bg-emerald-500"}`} />
          {Math.max(0, Number(data.quantity) || 0)} in stock
        </div>
        <div className="mt-auto pt-2.5 sm:pt-4">
          <button
            disabled={isOutOfStock}
            onClick={() => {
              if (isOutOfStock) {
                toast.warning("This product is not available at the moment");
              } else {
                addToCart(data);
              }
            }}
            className="w-full rounded-md bg-blue-600 px-2 py-2.5 text-xs font-semibold text-white transition-all duration-200 cursor-pointer enabled:hover:bg-blue-700 enabled:hover:shadow-lg enabled:hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-xl sm:py-3 sm:text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
