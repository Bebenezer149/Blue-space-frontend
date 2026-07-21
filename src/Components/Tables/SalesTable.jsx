import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

function SalesTable() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
   
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
        setSales(res.order || []);
        setIsLoading(false);
        res.order.status === "PENDING" && toast.update("You have new orders to process")
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Filter sales based on search
  const filteredSales = sales.filter((sale) =>
    sale.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id?.toString().includes(searchTerm)
  );

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      DELIVERED: "bg-green-100 text-green-700",
      PENDING: "bg-yellow-100 text-yellow-700",
      CONFIRMED: "bg-blue-100 text-blue-700",
      CANCELLED: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Sales History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Sales: <span className="font-semibold text-gray-700">{sales.length}</span>
          </p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-500">Loading sales data...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && sales.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-300 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          <p className="text-gray-500">No sales data available</p>
        </div>
      )}

      {/* No search results */}
      {!isLoading && sales.length > 0 && filteredSales.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders match your search.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Table - Desktop View */}
      {!isLoading && filteredSales.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sale ID
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="p-3 text-sm font-medium text-gray-800">
                    #{sale.id}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {sale.customer_name}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {sale.phone_number}
                  </td>
                  <td className="p-3 text-sm font-semibold text-gray-800">
                    {formatCurrency(sale.total_amount)}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {sale.payment_method}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {formatDate(sale.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cards - Mobile/Tablet View */}
      {!isLoading && filteredSales.length > 0 && (
        <div className="md:hidden space-y-4">
          {filteredSales.map((sale) => (
            <div key={sale.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Order </span>
                  <span className="text-sm font-semibold text-gray-800 ml-1">{sale.id}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                  {sale.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="text-sm font-medium text-gray-800">{sale.customer_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-700">{sale.phone_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-sm font-bold text-gray-800">{formatCurrency(sale.total_amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Payment</p>
                  <p className="text-sm text-gray-700">{sale.payment_method}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm text-gray-700">{formatDate(sale.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {!isLoading && filteredSales.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm text-gray-500">
            Showing {filteredSales.length} of {sales.length} orders
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Rows per page:</span>
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesTable;