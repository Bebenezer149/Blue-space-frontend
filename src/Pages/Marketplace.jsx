import Hero from "../Components/Hero";
import { useState } from "react";
import { Handbag } from "lucide-react";
import { Smartphone } from "lucide-react";
import { House } from "lucide-react";
import { Utensils } from "lucide-react";
import { Book } from "lucide-react";
import { Gem } from "lucide-react";
import { Dumbbell } from "lucide-react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Cards/ProductCard";
import { useEffect } from "react";
import { API_URL } from "../config";
function Marketplace() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const initialProductCount = 10;

  const filteredProducts = products.filter((product) =>
    product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setExpandedCategories({});
  };

  const categories = [
    {
      icon: <Handbag color="purple" />,
      title: "Fashion",
      color: "bg-purple-50",
    },
    {
      icon: <Smartphone color="blue" />,
      title: "Electronics",
      color: "bg-blue-50",
    },
    {
      icon: <House color="violet" />,
      title: "Housing & Furniture",
      color: "bg-violet-50",
    },
    {
      icon: <Utensils color="orange" />,
      title: "Food & Drinks",
      color: "bg-orange-50",
    },
    {
      icon: <Book color="green" />,
      title: "Books & Stationery",
      color: "bg-green-50",
    },
    {
      icon: <Gem color="pink" />,
      title: "Jewelry & Accessories",
      color: "bg-pink-50",
    },
    {
      icon: <Dumbbell color="red" />,
      title: "Fitness & Sports",
      color: "bg-red-50",
    },
  ];

  const navItems = [
    "Deals",
    "Top Sellers",
    "New Arrivals",
    "Stores",
    "Track Order",
    "Help",
  ];

  const noticeItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
      title: "Trusted Sellers",
      text: "Verified and reviewed",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      ),
      title: "Secure Shipping",
      text: "Shop with confidence",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
      ),
      title: "Fast Delivery",
      text: "Anywhere here in Ghana",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
      title: "Buyer Protection",
      text: "Get help when you need it",
    },
  ];

  useEffect(() => {
    fetch(`${API_URL}/market-products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white shadow-sm">
          <div className="px-4 sm:px-6 md:px-8 lg:px-4 xl:px-6">
            <div className="flex flex-wrap items-center justify-between py-3 gap-3">
              {/* Logo Section */}
              <div className="flex flex-col flex-shrink-0">
                <h1 className="font-bold text-xl sm:text-2xl text-blue-500">
                  Blue Space
                </h1>
                <h1 className="font-semibold text-xs sm:text-sm text-gray-600">
                  Marketplace
                </h1>
              </div>

              <div className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products, brands and stores..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors">
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="hidden sm:block cursor-pointer text-blue-500 font-semibold text-sm whitespace-nowrap hover:text-blue-700 transition-colors">
                  <Link to={"/Login"}>Sell on Blue Space</Link>
                </button>

                <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>

                <button className="text-gray-600 hover:text-gray-800 transition-colors p-1 relative">
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
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden text-gray-600 hover:text-gray-800 p-1"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                      d={
                        isMenuOpen
                          ? "M6 18L18 6M6 6l12 12"
                          : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      }
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pb-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="px-4 sm:px-6 md:px-8 lg:px-4 xl:px-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10 py-3 overflow-x-auto">
              {navItems.map((item) => (
                <div
                  key={item}
                  className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer whitespace-nowrap transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div
              className={`md:hidden ${isMenuOpen ? "block" : "hidden"} py-3`}
            >
              <div className="flex flex-col space-y-3">
                <button className="w-full text-left text-blue-500 font-semibold text-sm py-2 border-b border-gray-100">
                  Sell on Blue Space
                </button>
                {navItems.map((item) => (
                  <div
                    key={item}
                    className="text-sm font-medium text-gray-700 hover:text-blue-500 cursor-pointer py-2 border-b border-gray-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[120px] md:h-[130px] lg:h-[140px]"></div>

      {/* Hero Section */}
      <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-4 xl:px-6">
        <Hero />
      </div>

      {/* Notice Items - Hidden on mobile, visible on tablets and above */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-6 sm:px-6 md:px-8 lg:px-4 xl:px-6">
        {noticeItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-blue-500 flex-shrink-0">{item.icon}</div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-sm sm:text-base">
                {item.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div className="m-4 px-4 flex items-center justify-start">
        <h1 className="font-semibold text-xl">Shop by Categories</h1>
      </div>

      {/* Horizontal scrolling on mobile, grid on larger screens */}
      <div className="px-4 mt-4">
        {/* Mobile - Horizontal Scroll */}
        <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105 w-[100px] snap-start"
            >
              <div
                className={`h-16 w-16 shadow-sm ${item.color} flex items-center justify-center rounded-full`}
              >
                {item.icon}
              </div>
              <h1 className="font-semibold text-sm text-center">
                {item.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Desktop - Grid Layout */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div
                className={`h-16 w-16 shadow-sm ${item.color} flex items-center justify-center rounded-full`}
              >
                {item.icon}
              </div>
              <h1 className="font-semibold text-sm text-center">
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {categories.map((item) => {
        const isExpanded = expandedCategories[item.title];
        const visibleProducts = isExpanded
          ? filteredProducts
          : filteredProducts.slice(0, initialProductCount);

        return (
        <section key={item.title} className="mx-4 mt-18">
          <div className="m-3 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            {filteredProducts.length > initialProductCount && (
              <button
                type="button"
                onClick={() =>
                  setExpandedCategories((expanded) => ({
                    ...expanded,
                    [item.title]: !isExpanded,
                  }))
                }
                className="shrink-0 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-3 xl:grid-cols-5">
            {visibleProducts.map((item) => (
              <div
                key={item.id}
                className="w-72 shrink-0 snap-start md:w-auto md:shrink"
              >
                <ProductCard
                  data={item}
                  img={item.img}
                  price={item.price}
                  title={item.product_name}
                />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="py-10 text-center text-gray-500">
              No products found.
            </p>
          )}
        </section>
        );
      })}
    </div>
  );
}

export default Marketplace;
