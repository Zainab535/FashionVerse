import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageBrands from "./admin/ManageBrands";
import ManageUsers from "./admin/ManageUsers";
import ManageProducts from "./admin/ManageProducts";
import ManageSettings from "./admin/ManageSettings";
import ManageVerifications from "./admin/ManageVerifications";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";


class App extends Component {
  render() {
    return (
      <Router>
        <CartProvider>
          <CartSidebar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout/shipping" element={<ShippingPage />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/brands" element={<ManageBrands />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/settings" element={<ManageSettings />} />
            <Route path="/admin/verifications" element={<ManageVerifications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </Router>
    );
  }
}

export default App;
