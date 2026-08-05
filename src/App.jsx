// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Profile from "./Pages/Profile";
import Landing from "./Pages/Landing";
// import Header from "./Components/Header";
// import Store from "./Pages/Store";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProductPage from "./Pages/ProductPage";
import AddProductPage from "./Pages/AddProductsPage";
import OrderManager from "./Pages/OrderManager";
import ViewOrder from "./Pages/ViewOrder";
import Store from "./Pages/Store";
import ProtectedRoute from "./Components/ProtectedRoute";
import ToastViewport from "./Components/ToastViewport";
import { Component } from "./Components/Button/Button";

function App() {
  return (
    <>
      <ToastViewport />
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path="/add-products" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
        <Route path="/order-manager" element={<ProtectedRoute><OrderManager/></ProtectedRoute>}/>
        <Route path="/preview-order" element={<ProtectedRoute><ViewOrder/></ProtectedRoute>}/>
        <Route path="/store/:slug" element={<Store/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        {/* <Route path="/flowbite-test" element={<div className="min-h-screen bg-gray-100 p-8"><Buttons /></div>} /> */}
        <Route  path="/buttons" element={<Component/>}/>
        

      </Routes>
    </>
  );
}

export default App;
