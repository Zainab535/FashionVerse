import React, { Component } from "react";
import logo from "../assets/images/brand2.jpg";
import { CartContext } from "../context/CartContext";
import wishlistIcon from "../assets/icons/my-wish-list.png";
import bagIcon from "../assets/icons/shopping-bag.svg";
import userIcon from "../assets/icons/person.svg";
import searchIcon from "../assets/icons/search.svg";

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
          <span>Brands</span>
          <span>About</span>
          <span>Contact</span>
          <span className="sale">3D Mall</span>
        </nav>

        {/* RIGHT ICONS */}
       <div className="nav-icons">
    <img
    src={searchIcon}
    alt="search"
    className="nav-icon"
  />
  {/* Wishlist */}
  <img
    src={wishlistIcon}
    alt="Wishlist"
    className="nav-icon"
  />

  {/* Cart / Bag */}
  <div className="bag-icon" onClick={toggleCart}>
    <img
      src={bagIcon}
      alt="Cart"
      className="nav-icon"
    />

    {count > 0 && (
      <span className="bag-count">{count}</span>
    )}
  </div>

  {/* Profile */}
  <img
    src={userIcon}
    alt="Profile"
    className="nav-icon"
  />
</div>

      </header>
    );
  }
}

export default StoreNavbar;
