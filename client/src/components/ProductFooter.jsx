import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductFooter extends Component {
  render() {
    return (
      <footer className="product-footer">
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-column">
            <h3>FashionVerse</h3>
            <p>
              Redefining luxury through minimalist design and editorial
              aesthetics. Experience the future of digital couture with
              curated collections from world-renowned designers.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Pinterest">📌</a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-column">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/home">New Arrivals</Link></li>
              <li><Link to="/home">Women</Link></li>
              <li><Link to="/home">Men</Link></li>
              <li><Link to="/home">Accessories</Link></li>
              <li><Link to="/home">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2024 FashionVerse Inc. All rights reserved. | Based in Pakistan</p>
          <div className="footer-payment">
            <span>💳 VISA</span>
            <span>💳 MASTERCARD</span>
            <span>💵 PAYPAL</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default ProductFooter;
