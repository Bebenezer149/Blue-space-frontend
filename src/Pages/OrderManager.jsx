import Header from "../Components/Header";
import { useEffect, useState } from "react";
import OrderCard from "../Components/Cards/OrderCard";
import ViewOrder from "./ViewOrder";
import { toast } from "react-toastify";
import { API_URL } from "../config";

function OrderManager() {
  const slug = localStorage.getItem("slug");
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tick, setTick] = useState(false);
  const [copy] = useState(`${window.location.origin}/store/${slug}`);
  const [orderDetails, setOrderDetails] = useState({
    id: "",
    customer_name: "",
    phone_number: "",
    total_amount: "",
    payment_method: "",
    additional_notes: "",
    created_at: "",
    status: "",
    items: [],
  });

  const token = localStorage.getItem("token");

  function fetchOrders() {
    setIsRefreshing(true);
    fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOrders(res.order || []);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsRefreshing(false);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toLowerCase().includes(search.toLowerCase()),
  );

  function clearCard(id) {
    setOrders((prevOrders) => prevOrders.filter((item) => item.id !== id));
  }

  // Statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING",
  ).length;
  const confirmedOrders = orders.filter(
    (order) => order.status === "CONFIRMED",
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED",
  ).length;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(copy);
    setTick(true);
    toast.info("Copied to clipboard");
   
    
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Heading Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Orders
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage all customer orders in one place.
            </p>
          </div>
        </div>

        {/* Search and Store Link */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white"
            />
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <div className="bg-blue-50 border border-blue-200 flex items-center overflow-auto gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 truncate max-w-full">
              <span className="text-blue-600">{copy}</span>
              <button onClick={copyToClipboard}>
                {tick ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-blue-400 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8">
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
              {totalOrders}
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-500 mt-1">
              {pendingOrders}
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-gray-500">Confirmed</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mt-1">
              {confirmedOrders}
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-gray-500">Delivered</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-500 mt-1">
              {deliveredOrders}
            </h2>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm mt-6 sm:mt-8 overflow-hidden">
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
                Recent Orders
              </h2>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredOrders.length} order
                {filteredOrders.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            {isRefreshing ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="text-gray-500">Loading orders...</span>
                </div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    clearCard={clearCard}
                    setIsOpen={setIsOpen}
                    setOrderDetails={setOrderDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="flex justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-16 h-16 text-gray-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm sm:text-base">
                  {search ? "No orders match your search." : "No orders found."}
                </p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Order Modal */}
      {isOpen && (
        <ViewOrder setIsOpen={setIsOpen} orderDetails={orderDetails} />
      )}
    </div>
  );
}

export default OrderManager;
