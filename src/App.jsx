// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
// import Header from "./Components/Header";
// import Store from "./Pages/Store";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProductPage from "./Pages/ProductPage";
import AddProductPage from "./Pages/AddProductsPage";
import OrderManager from "./Pages/OrderManager";
import ViewOrder from "./Pages/ViewOrder";
import Store from "./Pages/Store";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/add-products" element={<AddProductPage />} />
        <Route path="/order-manager" element={<OrderManager/>}/>
        <Route path="/preview-order" element={<ViewOrder/>}/>
        <Route path="/store/:slug" element={<Store/>}/>

      </Routes>
    </>
  );
}

export default App;
