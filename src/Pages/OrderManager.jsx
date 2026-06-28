import Header from "../Components/Header";
import { useEffect, useState } from "react";
import OrderCard from "../Components/Cards/OrderCard";
import ViewOrder from "./ViewOrder";

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen]=useState(false)
  const [orderDetails, setOrderDetails]=useState({
    id:"",
    customer_name:"",
    phone_number:"",
    total_amount:"",
    payment_method:"",
    additional_notes:"",
    created_at:""
  })
//   const [isClose, setIsClose]= useState(false)

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOrders(res.order);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toLowerCase().includes(search.toLowerCase())
  );

  function clearCard(id) {
    setOrders((prevOrders) =>
        prevOrders.filter((item) => item.id !== id)
    );
}
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Orders
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all customer orders in one place.
            </p>
          </div>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Clear Notifications
          </button>

        </div>

        {/* Search */}

        <div className="mt-8  flex justify-between gap-4">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="font-semibold text-gray-400">
            <h1>Store Link: //store/name-of-business</h1>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold">{orders.length}</h2>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-500">
              {
                orders.filter(order => order.status === "PENDING").length
              }
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Confirmed</p>
            <h2 className="text-3xl font-bold text-blue-500">
              {
                orders.filter(order => order.status === "CONFIRMED").length
              }
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Delivered</p>
            <h2 className="text-3xl font-bold text-green-500">
              {
                orders.filter(order => order.status === "DELIVERED").length
              }
            </h2>
          </div>

        </div>

        {/* Orders */}

        <div className="bg-white rounded-xl shadow mt-8">

          <div className="border-b border-gray-300 p-5">
            <h2 className="font-semibold text-xl">
              Recent Orders
            </h2>
          </div>

          <div className="p-5 flex flex-col gap-5">

            {
              filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                     clearCard={clearCard}
                     setIsOpen={setIsOpen}
                     setOrderDetails={setOrderDetails}
                  />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No orders found.
                </div>
              )
            }

          </div>

        </div>

      </div>
     {
        isOpen && ( <ViewOrder setIsOpen={setIsOpen} orderDetails={orderDetails}/>)
     }
    </div>
  );
}

export default OrderManager;