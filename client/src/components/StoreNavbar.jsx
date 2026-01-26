import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { CartContext } from "../context/CartContext";
import wishlistIcon from "../assets/icons/my-wish-list.png";
import bagIcon from "../assets/icons/shopping-bag.svg";
import userIcon from "../assets/icons/person.svg";
import searchIcon from "../assets/icons/search.svg";
import menuIcon from "../assets/icons/menu.svg"; // Added menu icon

class StoreNavbar extends Component {

  /* 🔥 CartContext attach */
  static contextType = CartContext;

  state = {
    menuOpen: false,
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };


  render() {
    const { cart, toggleCart } = this.context;

    // total quantity count
    const count = cart.reduce((total, item) => total + item.qty, 0);

    return (
      <header className="store-navbar">

        <div className="nav-left-container">
          <Link to="/home" className="nav-left">
            <img src={logo} alt="FashionVerse Logo" className="nav-logo-img" />
          </Link>
        </div>

        {/* CENTER */}
        <nav className={`nav-links ${this.state.menuOpen ? "open" : ""}`}>
          <Link to="/home" className="nav-link-item" onClick={this.toggleMenu}>Home</Link>

          <span className="nav-link-item" onClick={this.toggleMenu}>Brands</span>
          <Link to="/about" className="nav-link-item" onClick={this.toggleMenu}>About</Link>
          <Link to="/contact" className="nav-link-item" onClick={this.toggleMenu}>Contact</Link>
          <span className="sale" onClick={this.toggleMenu}>3D Mall</span>
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

          {/* Login Button */}
          <Link to="/login" className="nav-login-btn">Login</Link>

          {/* Profile */}
          <Link to="/profile" className="profile-link">
            <img
              src={userIcon}
              alt="Profile"
              className="nav-icon"
            />
          </Link>
        </div>

      </header>
    );
  }
}

export default StoreNavbar;
