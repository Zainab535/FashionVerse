import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import OrderSuccessPage from "./Pages/OrderSuccessPage";

class App extends Component {
  render() {
    return (
      <Router>
         <CartProvider>   
            <CartSidebar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout/shipping" element={<ShippingPage />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />


        </Routes>
          </CartProvider>
      </Router>
    );
  }
}

export default App;
