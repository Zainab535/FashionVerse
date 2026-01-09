import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import "../styles/ProductDetail.css";
import { CartContext } from "../context/CartContext";

class ProductDetailPage extends Component {

  /* 🔥 Attach CartContext */
  static contextType = CartContext;

  handleAddToBag = () => {
    const product = this.props.location?.state?.product;
    const { addToCart, toggleCart } = this.context;

    addToCart(product);   // add item
    toggleCart();         // open sidebar
  };

  render() {
    const product = this.props.location?.state?.product;

    if (!product) {
      return <p style={{ padding: "100px" }}>Product not found</p>;
    }

    return (
      <>
        <StoreNavbar />

        <section className="product-detail">
          {/* LEFT IMAGE */}
          <div className="product-images">
            <img
              src={product.image}
              alt={product.name}
              className="product-main-image"
            />
          </div>

          {/* RIGHT INFO */}
          <div className="product-info">
            <span className="breadcrumb">
              Home / New Arrivals / {product.name}
            </span>

            <h1>{product.name}</h1>
            <p className="price">{product.price}</p>

            <p className="desc">
              Crafted with premium materials and minimalist
              aesthetics for modern luxury.
            </p>

            <div className="colors">
              <span>Color:</span>
              <div className="color black"></div>
              <div className="color grey"></div>
              <div className="color red"></div>
            </div>

            <div className="size">
              <span>Size</span>
              <p>One Size</p>
            </div>

            {/* 🔥 CONNECTED BUTTON */}
            <button
              className="add-to-bag"
              onClick={this.handleAddToBag}
            >
              Add to Bag →
            </button>

            <p className="stock">Only 3 items left in stock</p>
          </div>
        </section>
        <br></br>

        <ProductFooter />
      </>
    );
  }
}

export default withRouter(ProductDetailPage);
