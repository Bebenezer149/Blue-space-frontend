import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: "",
    product_name: "",
    description: "",
    price: "",
    quantity: "",
    img: "",
    status: "",
    date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products || []);
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  function DeleteProduct(id) {
    fetch(`http://127.0.0.1:8000/api/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => console.log(err));
  }

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const showProducts = searchText ? filteredProducts : products;

  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <div className="p-5 flex flex-col gap-8">
        <h1 className="font-semibold text-3xl">Your Products!</h1>

        <div className="flex justify-between mt-16">
          <div className="border border-gray-400 flex h-10 w-[300px] rounded-md bg-white">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              className="outline-none px-2 flex-1"
              placeholder="Search products"
            />

            <button className="border-l p-1 px-3 bg-blue-400 text-white">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

          <Link to={"/add-products"}>
            <button className="p-2 rounded-md bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold flex gap-1">
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Product
            </button>
          </Link>
        </div>

        <div className="rounded-t-lg border border-gray-200">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {showProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No products available
                  </td>
                </tr>
              ) : (
                showProducts.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b border-b-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4 text-center">{data.id}</td>

                    <td className="p-4 text-center">
                      <img
                        src={data.img}
                        alt={data.product_name}
                        className="h-12 w-12 rounded-md object-cover mx-auto"
                      />
                    </td>

                    <td className="p-4 text-center">{data.product_name}</td>

                    <td className="p-4 text-center">GH₵ {data.price}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          data.status === "AVAILABLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {new Date(data.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditOpen(true);
                            setProductDetails(data)
                          }}
                          className=" cursor-pointer py-1  text-blue-600 rounded"
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            setViewOpen(true);
                            setProductDetails(data);
                          }}
                          className=" cursor-pointer py-1  text-green-600 rounded"
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
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => DeleteProduct(data.id)}
                          className="py-1 cursor-pointer text-red-600 rounded"
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {viewOpen && (
          <ViewProduct
            productDetails={productDetails}
            setViewOpen={setViewOpen}
          />
        )}
      </div>
      <div>{editOpen && <EditProduct setEditOpen={setEditOpen} productDetails={productDetails} />}</div>
    </div>
  );
}

export default ProductPage;
