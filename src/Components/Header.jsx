import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  // const [active, setActive]=useState(false)
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("slug")
    navigate("/");
  }
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-blue-400">
          Blue Space
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center text-base lg:text-lg text-gray-700 gap-6 lg:gap-10">
          <Link to={"/dashboard"}>
            <button  className="cursor-pointer hover:text-blue-400">Home</button>
          </Link>

          <Link to={"/products"}>
            <button  className="cursor-pointer hover:text-blue-400">
              Products
            </button>
          </Link>
          <Link to={"/order-manager"}>
            <button  className="cursor-pointer hover:text-blue-400">
              Orders
            </button>
          </Link>
          {/* <Link to={"/report-center"}>
            <button className="cursor-pointer hover:text-blue-400">
              Report Center
            </button>
          </Link> */}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={Logout}
            className="px-4 py-2 rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-500"
          >
            Logout
          </button>

          <div className="p-2 border rounded-full border-slate-400 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Toggler */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8"
          >
            {openMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden flex flex-col gap-4 p-4 border-t border-gray-300">
          <Link to={"/dashboard"}>
            <button className="cursor-pointer hover:text-blue-400">Home</button>
          </Link>
          <Link to={"/products"}>
            <button className="cursor-pointer hover:text-blue-400">
              Products
            </button>
          </Link>
          <Link to={"/order-manager"}>
            <button className="cursor-pointer hover:text-blue-400">
              Orders
            </button>
          </Link>
          {/* <Link to={"/report-center"}>
            <button className="cursor-pointer hover:text-blue-400">
              Report Center
            </button>
          </Link> */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={Logout}
              className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
            >
              Logout
            </button>

            <div className="p-2 border rounded-full border-slate-400 text-slate-400">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
