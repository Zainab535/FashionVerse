import React, { Component } from "react";

class ProductFooter extends Component {
  render() {
    return (
      <footer className="product-footer">
        <div>
          <h4>FashionVerse</h4>
          <p>
            Redefining luxury through minimalist design
            and editorial aesthetics.
          </p>
        </div>

        <div>
          <h4>Customer Care</h4>
          <a>Contact</a>
          <a>Shipping & Returns</a>
          <a>FAQ</a>
        </div>

        <div>
          <h4>Legal Area</h4>
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>
      </footer>
    );
  }
}

export default ProductFooter;
