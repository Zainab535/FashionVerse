import React, { Component } from "react";
import logo from "../assets/images/brand2.jpg";
import { CartContext } from "../context/CartContext";

class StoreNavbar extends Component {

  /* 🔥 CartContext attach */
  static contextType = CartContext;

  render() {
    const { cart, toggleCart } = this.context;

    // total quantity count
    const count = cart.reduce((total, item) => total + item.qty, 0);

    return (
      <header className="store-navbar">
        {/* LEFT */}
        <div className="nav-left">
          <img src={logo} alt="Logo" className="nav-logo-img" />
          <span className="nav-brand">FASHIONVERSE</span>
        </div>

        {/* CENTER */}
        <nav className="nav-links">
          <span>New Arrivals</span>
          <span>Designers</span>
          <span>Clothing</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span className="sale">Sale</span>
        </nav>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          <span>♡</span>

          {/* 🔥 BAG ICON WITH COUNT */}
          <span className="bag-icon" onClick={toggleCart}>
            👜
            {count > 0 && (
              <span className="bag-count">{count}</span>
            )}
          </span>

          <span>👤</span>
        </div>
      </header>
    );
  }
}

export default StoreNavbar;
