import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import ProductDetailPage from "./Pages/ProductDetailPage";
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
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
          </CartProvider>
      </Router>
    );
  }
}

export default App;
