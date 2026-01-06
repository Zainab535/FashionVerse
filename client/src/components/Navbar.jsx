import React, { Component } from "react";
import menuIcon from "../assets/icons/menu.svg";
import searchIcon from "../assets/icons/search.svg";
import bagIcon from "../assets/icons/shopping-bag.svg";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <img src={menuIcon} alt="menu" className="nav-icon" />

        <div className="nav-right">
          <span className="login-text">LOGIN</span>
          <img src={searchIcon} alt="search" className="nav-icon" />
          <img src={bagIcon} alt="cart" className="nav-icon" />
        </div>
      </nav>
    );
  }
}

export default Navbar;
 