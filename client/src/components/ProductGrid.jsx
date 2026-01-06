import React, { Component } from "react";

class ProductGrid extends Component {
  render() {
    return (
      <section className="products">
        <h2>New Arrivals</h2>

        <div className="filters">
          <button className="active">All</button>
          <button>3D Ready</button>
          <button>Runway</button>
          <button>Essentials</button>
          <button>Accessories</button>
        </div>

        <div className="grid">
          <div className="product-card">
            <img src="/products/coat.jpg" alt="" />
            <p className="brand">MAISON MARGIELA</p>
            <h4>Oversized Wool Coat</h4>
            <span>$1,250</span>
          </div>

          <div className="product-card">
            <img src="/products/dress.jpg" alt="" />
            <p className="brand">RICK OWENS</p>
            <h4>Asymmetric Silk Dress</h4>
            <span>$890</span>
          </div>

          <div className="product-card">
            <img src="/products/bag.jpg" alt="" />
            <p className="brand">BOTTEGA VENETA</p>
            <h4>Structured Leather Tote</h4>
            <span>$2,400</span>
          </div>
        </div>

        <button className="load-more">LOAD MORE PRODUCTS</button>
      </section>
    );
  }
}

export default ProductGrid;
