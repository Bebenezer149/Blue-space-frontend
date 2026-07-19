import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import ViewProduct from "./ViewProduct";
import DeletePrompt from "../Components/Prompts/DeletePrompt";
import EditProduct from "./EditProduct";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id,setId]=useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [productName, setProductName]=useState("")
  // const [openAddProduct , setOpenAddProduct]= useState(false)
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

  function fetchProducts() {
    setIsRefreshing(true);
    fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products || []);
        console.log(res);
        setIsRefreshing(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch products");
        console.log(err);
        setIsRefreshing(false);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function DeleteProduct(id) {

    fetch(`${API_URL}/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete product");
      });
  }

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const showProducts = searchText ? filteredProducts : products;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8">
        <h1 className="font-semibold text-2xl sm:text-3xl text-gray-800">Your Products!</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="border border-gray-300 flex h-10 w-full sm:max-w-xs rounded-md bg-white">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              className="outline-none px-3 flex-1 min-w-0 rounded-l-md"
              placeholder="Search products"
            />
            <button className="border-l p-1 px-3 bg-blue-500 text-white shrink-0 rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 sm:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

          <Link to={"/add-products"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto p-2.5 px-4 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
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

        {/* Desktop table */}
        <div className="hidden md:block rounded-lg border border-gray-200 overflow-x-auto bg-white">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>

            <tbody>
              {isRefreshing ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="text-gray-500">Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : showProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No products available
                  </td>
                </tr>
              ) : (
                showProducts.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm">{data.id}</td>

                    <td className="p-4">
                      <img
                        src={data.img}
                        alt={data.product_name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">{data.product_name}</td>

                    <td className="p-4">GH₵ {data.price}</td>

                    <td className="p-4">
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

                    <td className="p-4 text-sm text-gray-600">
                      {new Date(data.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditOpen(true);
                            setProductDetails(data);
                          }}
                          className="cursor-pointer text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            setViewOpen(true);
                            setProductDetails(data);
                          }}
                          className="cursor-pointer text-green-600 hover:text-green-800 p-1"
                          title="View"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            setDeleteOpen(true);
                            setId(data.id);
                            setProductName(data.product_name)
                          }}
                          className="cursor-pointer text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {isRefreshing ? (
            <div className="flex justify-center items-center gap-2 py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-500">Loading products...</span>
            </div>
          ) : showProducts.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No products available</p>
          ) : (
            showProducts.map((data) => (
              <div key={data.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex gap-4">
                  <img
                    src={data.img}
                    alt={data.product_name}
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-800 truncate">{data.product_name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                          data.status === "AVAILABLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {data.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-bold mt-1">GH₵ {data.price}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(data.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => { setEditOpen(true); setProductDetails(data); }}
                    className="flex-1 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setViewOpen(true); setProductDetails(data); }}
                    className="flex-1 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => { setDeleteOpen(true); setId(data.id); setProductName(data.product_name) }}
                    className="flex-1 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {viewOpen && (
        <ViewProduct
          productDetails={productDetails}
          setViewOpen={setViewOpen}
        />
      )}

      {editOpen && (
        <EditProduct
          setEditOpen={setEditOpen}
          productDetails={productDetails}
          onProductRefresh={fetchProducts}
        />
      )}

     {deleteOpen && ( <DeletePrompt id={id} productName={productName} deleteProduct={ DeleteProduct} setDeleteOpen={setDeleteOpen}/>)}
    </div>
  );
}

export default ProductPage;
