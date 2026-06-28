import { useEffect, useState } from "react";
function SalesTable() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        setSales(res.order);
      });
  }, []);
  return (
    <div className="bg-slate-50 rounded-lg shadow-md p-4 ">
      <h2 className="text-xl font-semibold mb-4">Sales History</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Sale ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Phone Number</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b hover:bg-gray-50">
              <td className="p-3">#{sale.id}</td>

              <td className="p-3">{sale.customer_name}</td>

              <td className="p-3">{sale.phone_number}</td>

              <td className="p-3 font-semibold">GH₵ {sale.total_amount}</td>

              <td className="p-3">{sale.payment_method}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded ${
                    sale.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {sale.status}
                </span>
              </td>

              <td className="p-3">
                {new Date(sale.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default SalesTable;
