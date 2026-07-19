import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../Components/Cards/ProductCard";
import ViewProduct from "./ViewProduct";
import Cart from "../Components/Cart/Cart";
import { API_URL } from "../config";

function Store() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [storeData, setStoreData] = useState(null);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [openViewCard, setOpenViewCard] = useState(false);

  const businessName = localStorage.getItem("business")
  // const [productDetails, setProductDetails]=useState(null)

  useEffect(() => {
    fetch(`${API_URL}/show-products?link=${slug}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res.products || []);
        setStoreData(res.store || null);
      })
      .catch((err) => console.log(err));
  }, [slug]);

  function addToCart(cartData) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === cartData.id);
      if (exists) {
        return prev.map((item) =>
          item.id === cartData.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...cartData, quantity: 1 }];
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Banner */}
      <div className="relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 p-8 md:p-12 h-auto md:h-80 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Store Logo */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white p-1">
              <img
                className="h-full w-full object-cover rounded-full"
                src={storeData?.logo || "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={slug}
              />
            </div>
            {/* Online Status Indicator */}
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-green-500 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-white shadow-lg"></div>
          </div>

          {/* Store Details */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {storeData?.name || businessName}
            </h1>

            {/* Contact Information */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 items-center mb-3">
              <h1 className="flex gap-2 text-sm md:text-base font-semibold text-white/90 items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 md:size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                {storeData?.phone || "+233 539278827"}
              </h1>

              <h1 className="flex gap-2 text-sm md:text-base font-semibold text-white/90 items-center bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 md:size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                {storeData?.email || "me@me.com"}
              </h1>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mb-4">
              {/* <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white font-semibold">{storeData?.subscribers || "2.5K"}</span>
                </div>
                <span className="text-white/70 text-sm">Subscribers</span>
              </div> */}

              {/* <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-semibold">{storeData?.rating || "4.8"}</span>
                </div>
                <span className="text-white/70 text-sm">({storeData?.reviews || "2.5K"} Reviews)</span>
              </div> */}

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white font-semibold">{products.length}</span>
                </div>
                <span className="text-white/70 text-sm">Products</span>
              </div>
            </div>

            {/* Subscribe Button */}
            {/* <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="flex cursor-pointer items-center gap-2 border-2 border-white/30 px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Subscribe
              </button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="border-b static border-gray-200 h-20 justify-between  py-3 items-center flex gap-3 px-4 md:px-8 font-semibold bg-gray-100">
        <div className="flex gap-4 md:gap-4 overflow-x-hidden flex-1 min-w-0">
          <button className="py-2 bg-white border mb-2 px-3 md:px-4 shadow-sm rounded-lg text-blue-400 cursor-pointer hover:bg-gray-100 whitespace-nowrap">
            All Products
          </button>
          <button className="py-2 bg-white mb-2 px-3 md:px-4 shadow-sm rounded-lg text-blue-400 cursor-pointer hover:bg-gray-100 whitespace-nowrap">
            Available
          </button>
          <button className="py-2 bg-white mb-2 px-3 md:px-4 shadow-sm rounded-lg text-blue-400 cursor-pointer hover:bg-gray-100 whitespace-nowrap">
            Out Of Stock
          </button>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setOpenCart(true)}
            className="relative p-3 mb-2 bg-white text-blue-500 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Grid - Fixed Arrangement */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((data) => (
              <ProductCard
                onClick={() => setOpenViewCard(true)}
                key={data.id}
                data={data}
                img={data.img}
                title={data.product_name}
                price={data.price}
                status={data.status}
                addToCart={addToCart}
                setOpenCart={setOpenCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600">No products found</h3>
            <p className="text-gray-400">This store doesn't have any products yet.</p>
          </div>
        )}
      </div>
      {openCart && (
        <Cart cart={cart} setCart={setCart} setOpenCart={setOpenCart} storeData={storeData} />
      )}
      {openViewCard && <ViewProduct />}
    </div>
  );
}

export default Store;

