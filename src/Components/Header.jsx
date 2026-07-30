import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [ image, setImage]=useState("")
  // const [active, setActive]=useState(false)

  const token=localStorage.getItem("token")
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("slug")
    navigate("/");
  }


  useEffect(()=>{
    fetch("https://makola-2.onrender.com/api/user",{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${token}`
      },
      
    },[])
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      setImage(res)
    })
    .catch((err)=>console.log(err))


  })
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
          <Link to={"/profile"}>
            <button  className="cursor-pointer hover:text-blue-400">
              Profile
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

          <Link to={"/profile"}>
            <div className="h-14 w-14 border rounded-full border-slate-400 text-slate-400 cursor-pointer hover:text-blue-400 hover:border-blue-400">
            <img className="h-full w-full rounded-full" src={image} alt="" />
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
          <Link to={"/profile"}>
            <button className="cursor-pointer hover:text-blue-400">
              Profile
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

              <div className="h-14 w-14 border rounded-full border-slate-400 text-slate-400 cursor-pointer hover:text-blue-400 hover:border-blue-400">
            <img className="h-full w-full rounded-full" src={image} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
