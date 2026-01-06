import React, { Component } from "react";
import searchIcon from "../assets/icons/search.svg";
import bagIcon from "../assets/icons/shopping-bag.svg";
import userIcon from "../assets/icons/user.svg";

class StoreNavbar extends Component {
  render() {
    return (
      <nav className="store-navbar">
        <div className="logo">FASHIONVERSE</div>

        <ul className="menu">
          <li>SHOP</li>
          <li>COLLECTIONS</li>
          <li>EDITORIAL</li>
          <li>JOURNAL</li>
        </ul>

        <div className="nav-actions">
          <img src={searchIcon} alt="search" />
          <img src={bagIcon} alt="cart" />
          <img src={userIcon} alt="user" />
        </div>
      </nav>
    );
  }
}

export default StoreNavbar;
