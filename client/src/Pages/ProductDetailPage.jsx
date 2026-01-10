import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import "../styles/ProductDetail.css";
import { CartContext } from "../context/CartContext";

class ProductDetailPage extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    const product = props.location?.state?.product;

    this.state = {
      activeImage: product?.image || "",
      activeTab: "description",
      reviewIndex: 0, // ✅ REQUIRED
    };

    // ✅ REVIEWS DATA (TEXT ONLY – NO IMAGES)
    this.reviews = [
      {
        text: "Excellent fabric & fit. Feels premium and luxurious.",
        name: "Shazia Sajjad",
      },
      {
        text: "Great quality stitching. Worth every penny.",
        name: "Rubab Aamir",
      },
      {
        text: "Minimal design but very classy. Loved it!",
        name: "Sehrish Jamil",
      },
      {
        text: "Comfortable and elegant. Perfect for winters.",
        name: "Ayesha Khan",
      },
    ];
  }

  /* ================= CART ================= */
  handleAddToBag = () => {
    const product = this.props.location?.state?.product;
    const { addToCart, toggleCart } = this.context;

    addToCart(product);
    toggleCart();
  };

  /* ================= TABS ================= */
  renderTabContent = () => {
    const { activeTab } = this.state;

    if (activeTab === "description") {
      return (
        <ul>
          <li>Premium wool blend fabric</li>
          <li>Relaxed oversized silhouette</li>
          <li>Minimalist luxury finish</li>
        </ul>
      );
    }

    if (activeTab === "size") {
      return <p>One Size · Relaxed oversized fit</p>;
    }

    if (activeTab === "shipping") {
      return <p>Free shipping · Returns accepted within 14 days</p>;
    }
  };

  /* ================= REVIEWS LOGIC ================= */
  componentDidMount() {
    this.reviewTimer = setInterval(this.nextReview, 4000); // auto scroll
  }

  componentWillUnmount() {
    clearInterval(this.reviewTimer);
  }

  nextReview = () => {
    this.setState((prev) => ({
      reviewIndex: (prev.reviewIndex + 1) % this.reviews.length,
    }));
  };

  prevReview = () => {
    this.setState((prev) => ({
      reviewIndex:
        prev.reviewIndex === 0
          ? this.reviews.length - 1
          : prev.reviewIndex - 1,
    }));
  };

  render() {
    const product = this.props.location?.state?.product;
    if (!product) {
      return <p style={{ padding: "100px" }}>Product not found</p>;
    }

    const images =
      product.images && product.images.length
        ? product.images
        : [product.image];

    return (
      <>
        <StoreNavbar />

        {/* ================= PRODUCT ================= */}
        <section className="product-detail">
          {/* LEFT: GALLERY */}
          <div className="product-gallery">
            <div className="thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => this.setState({ activeImage: img })}
                  className={this.state.activeImage === img ? "active" : ""}
                />
              ))}
            </div>

            <div className="main-image">
              <img src={this.state.activeImage} alt={product.name} />
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="product-info">
            <span className="breadcrumb">
              Home / New Arrivals / {product.name}
            </span>

            <h1>{product.name}</h1>
            <p className="price">{product.price}</p>

            <p className="desc">
              Crafted with premium materials and minimalist aesthetics for
              modern luxury.
            </p>

            <div className="colors">
              <span>Color:</span>
              <div className="color black" />
              <div className="color grey" />
              <div className="color red" />
            </div>

            <div className="size">
              <span>Size</span>
              <p>One Size</p>
            </div>

            <button className="add-to-bag" onClick={this.handleAddToBag}>
              Add to Bag →
            </button>

            <p className="stock">Only 3 items left in stock</p>

            {/* ================= TABS ================= */}
            <div className="product-tabs">
              <div className="tab-head">
                <span
                  className={this.state.activeTab === "description" ? "active" : ""}
                  onClick={() => this.setState({ activeTab: "description" })}
                >
                  DESCRIPTION
                </span>
                <span
                  className={this.state.activeTab === "size" ? "active" : ""}
                  onClick={() => this.setState({ activeTab: "size" })}
                >
                  SIZE CHART
                </span>
                <span
                  className={this.state.activeTab === "shipping" ? "active" : ""}
                  onClick={() => this.setState({ activeTab: "shipping" })}
                >
                  SHIPPING & RETURN
                </span>
              </div>

              <div className="tab-content">
                {this.renderTabContent()}
              </div>
            </div>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="reviews-section">
          <h2>Let customers speak for us</h2>

          <div className="reviews-meta">
            <span className="stars">★★★★★</span>
            <span className="count">from 611 reviews ✓</span>
          </div>

          <div className="review-slider">
            <button className="arrow" onClick={this.prevReview}>‹</button>

            <div className="review-card">
              <p className="review-text">
                “{this.reviews[this.state.reviewIndex].text}”
              </p>
              <span className="review-author">
                — {this.reviews[this.state.reviewIndex].name}
              </span>
            </div>

            <button className="arrow" onClick={this.nextReview}>›</button>
          </div>
        </section>

        <ProductFooter />
      </>
    );
  }
}

export default withRouter(ProductDetailPage);
