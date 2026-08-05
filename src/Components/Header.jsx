import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bluespaceLogo from "../assets/remove-the--blue-space--text-at-the-bottom-of-the-.png";
import { API_URL } from "../config";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [image, setImage] = useState("");
  const location = useLocation();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const navItems = [
    { to: "/dashboard", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/order-manager", label: "Orders" },
    { to: "/profile", label: "Profile" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("slug");
    navigate("/login");
  }

  useEffect(() => {
    fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setImage(res.user.profile_picture);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 group"
        >
          <img
            src={bluespaceLogo}
            alt="Blue Space logo"
            className="left-4 h-14 w-auto object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gradient">
            Blue Space
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center text-base lg:text-lg text-gray-700 gap-6 lg:gap-10">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <button
                className={`cursor-pointer transition-all duration-200 relative py-1 ${
                  isActive(item.to)
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-400"
                }`}
              >
                {item.label}
                {isActive(item.to) && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-blue-500 animate-fade-in" />
                )}
              </button>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={Logout}
            className="px-4 py-2 rounded-md bg-blue-400 text-white cursor-pointer hover:bg-blue-500"
          >
            Logout
          </button>

          <Link to={"/profile"}>
            <div className="h-14 w-14 border rounded-full border-slate-400 text-slate-400 cursor-pointer hover:text-blue-400 hover:border-blue-400 overflow-hidden flex items-center justify-center">
              {image ? (
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={image}
                  alt="Profile"
                />
              ) : (
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
              )}
            </div>
          </Link>
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
        <div className="md:hidden flex flex-col gap-4 p-4 border-t border-gray-300 animate-slide-down">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpenMenu(false)}>
              <button
                className={`cursor-pointer transition-all duration-200 ${
                  isActive(item.to)
                    ? "text-blue-500 font-semibold"
                    : "hover:text-blue-400"
                }`}
              >
                {item.label}
              </button>
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={Logout}
              className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
            >
              Logout
            </button>

            <Link to={"/profile"}>
              <div className="h-14 w-14 border rounded-full border-slate-400 text-slate-400 cursor-pointer hover:text-blue-400 hover:border-blue-400 overflow-hidden flex items-center justify-center">
                {image ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={image}
                    alt="Profile"
                  />
                ) : (
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
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
