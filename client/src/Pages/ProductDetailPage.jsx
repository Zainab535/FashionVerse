import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";
import StoreNavbar from "../components/StoreNavbar";
import ProductFooter from "../components/ProductFooter";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ProductDetail.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import api from "../api";
import ComparisonModal from "../components/ComparisonModal";
import RecommendationSection from "../components/RecommendationSection";

class ProductDetailPage extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    const product = props.location?.state?.product;
    const firstImage = product?.images?.[0] || product?.image || "";
    const activeImage = firstImage && firstImage.startsWith && firstImage.startsWith('http') ? firstImage : (firstImage ? `http://localhost:5000/uploads/${firstImage}` : "");

    this.state = {
      product: product || null,
      activeImage: activeImage,
      activeTab: "description",
      reviewIndex: 0, // ✅ REQUIRED
      showSizeModal: false,
      selectedSize: product?.sizes?.[0] || "",
      selectedColor: product?.colors?.[0] || "",
      quantity: 1,
      isPaused: false,
      showComparisonModal: false,
      relatedProducts: [],
      relatedLoading: true,
      productReviews: [],
      reviewsLoading: true
    };

    this.reviewScrollRef = React.createRef();
    this.scrollInterval = null;
    this.reviewFormRef = React.createRef();

    // ✅ REVIEWS DATA (PREMIUM)
    this.reviews = [
      {
        id: 1,
        rating: 5,
        title: "Perfect Winter Essential",
        text: "The fabric quality is outstanding. It's soft, warm, and has a beautiful drape. I've received so many compliments!",
        name: "Shazia Sajjad",
        date: "Feb 12, 2024",
        verified: true
      },
      {
        id: 2,
        rating: 5,
        title: "Exceeded Expectations",
        text: "The stitching is very neat and the fit is true to size. It feels like a high-end designer piece but at a much better price.",
        name: "Rubab Aamir",
        date: "Feb 08, 2024",
        verified: true
      },
      {
        id: 3,
        rating: 4,
        title: "Very Elegant",
        text: "Minimalist and classy. I love how it looks with both formal and casual accessories. Great addition to my wardrobe.",
        name: "Sehrish Jamil",
        date: "Jan 25, 2024",
        verified: true
      },
      {
        id: 4,
        rating: 5,
        title: "Luxurious Feel",
        text: "Comfortable and elegant. Perfect for the winter season. The color is exactly as shown in the pictures.",
        name: "Ayesha Khan",
        date: "Jan 18, 2024",
        verified: true
      }
    ];
  }

  handleAddToBag = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== 'customer') {
      alert("you have to register first if have account then login");

      // Save pending action so we can resume after login
      const pendingProd = this.state.product || this.props.location?.state?.product;
      if (pendingProd) {
        const payload = {
          id: pendingProd._id || pendingProd.id,
          _id: pendingProd._id || pendingProd.id,
          name: pendingProd.name,
          image: pendingProd.images?.[0]
            ? (pendingProd.images[0].startsWith('http') ? pendingProd.images[0] : `http://localhost:5000/uploads/${pendingProd.images[0]}`)
            : (pendingProd.image || ''),
          images: pendingProd.images || [],
          price: typeof pendingProd.price === 'string' ? parseFloat(pendingProd.price.replace(/[Rs. ,]/g, "")) : pendingProd.price,
          selectedSize: this.state.selectedSize,
          selectedColor: this.state.selectedColor,
          quantity: this.state.quantity
        };
        localStorage.setItem('pendingAction', JSON.stringify({ action: 'addToBag', product: payload }));
      }

      this.props.navigate("/login?redirectTo=" + encodeURIComponent(window.location.pathname));
      return;
    }

    const rawProduct = this.state.product || this.props.location?.state?.product;
    if (!rawProduct) return;

    // Ensure ID and Price are formatted
    const product = {
      ...rawProduct,
      id: rawProduct._id || rawProduct.id,
      _id: rawProduct._id || rawProduct.id,
      price: typeof rawProduct.price === 'string'
        ? parseFloat(rawProduct.price.replace(/[Rs. ,]/g, ""))
        : rawProduct.price
    };

    const { addToCart, toggleCart } = this.context;

    addToCart({
      ...product,
      selectedSize: this.state.selectedSize,
      selectedColor: this.state.selectedColor,
      quantity: this.state.quantity
    });
    toggleCart();
  };

  handleBuyNow = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== 'customer') {
      alert("you have to register first if have account then login");

      // Save pending buy action to resume after login
      const pendingProd = this.state.product || this.props.location?.state?.product;
      if (pendingProd) {
        const payload = {
          id: pendingProd._id || pendingProd.id,
          _id: pendingProd._id || pendingProd.id,
          name: pendingProd.name,
          image: pendingProd.images?.[0]
            ? (pendingProd.images[0].startsWith('http') ? pendingProd.images[0] : `http://localhost:5000/uploads/${pendingProd.images[0]}`)
            : (pendingProd.image || ''),
          images: pendingProd.images || [],
          price: typeof pendingProd.price === 'string' ? parseFloat(pendingProd.price.replace(/[Rs. ,]/g, "")) : pendingProd.price,
          selectedSize: this.state.selectedSize,
          selectedColor: this.state.selectedColor,
          quantity: this.state.quantity
        };
        localStorage.setItem('pendingAction', JSON.stringify({ action: 'buyNow', product: payload }));
      }

      this.props.navigate("/login?redirectTo=" + encodeURIComponent(window.location.pathname));
      return;
    }

    const rawProduct = this.state.product || this.props.location?.state?.product;
    if (!rawProduct) return;

    const product = {
      ...rawProduct,
      id: rawProduct._id || rawProduct.id,
      price: typeof rawProduct.price === 'string'
        ? parseFloat(rawProduct.price.replace(/[Rs. ,]/g, ""))
        : rawProduct.price
    };

    const { setBuyNowItem } = this.context;

    // 1. Set as direct buy item (skips the bag)
    setBuyNowItem({
      ...product,
      id: product._id || product.id,
      _id: product._id || product.id,
      selectedSize: this.state.selectedSize,
      selectedColor: this.state.selectedColor,
      qty: this.state.quantity
    });

    // 2. Navigate to shipping
    this.props.navigate("/checkout/shipping");
  };

  handleCompareProduct = () => {
    this.setState({ showComparisonModal: true });
  };

  handleQuantityChange = (delta) => {
    this.setState(prevState => ({
      quantity: Math.max(1, prevState.quantity + delta)
    }));
  };

  /* ================= TABS ================= */
  renderTabContent = (product) => {
    const { activeTab } = this.state;

    if (activeTab === "description") {
      return (
        <div className="product-description-tab">
          <p style={{ lineHeight: '1.6', color: '#4b5563' }}>{product.description || "No detailed description available."}</p>
        </div>
      );
    }

    if (activeTab === "size") {
      return product.sizeChart ? (
        <div className="size-chart-preview" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => this.setState({ showSizeModal: true })}>
          <img
            src={`http://localhost:5000/uploads/${product.sizeChart}`}
            alt="Size Chart Preview"
            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <p style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 600, marginTop: '8px' }}>🔍 Click to enlarge</p>
        </div>
      ) : (
        <p>One Size · Relaxed oversized fit</p>
      );
    }

    if (activeTab === "shipping") {
      return <p>Free shipping · Returns accepted within 14 days</p>;
    }
  };

  /* ================= REVIEWS LOGIC ================= */
  componentDidMount() {
    window.scrollTo(0, 0);
    this.startAutoScroll();
    this.loadProductIfNeeded();
    this.fetchProductReviews();
  }

  fetchProductReviews = async () => {
    const id = this.props.params?.id;
    if (!id) return;
    try {
      const res = await api.get(`/reviews/product/${id}`);
      this.setState({ productReviews: res.data, reviewsLoading: false });
    } catch (err) {
      console.error("Error fetching reviews:", err);
      this.setState({ reviewsLoading: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.params?.id !== prevProps.params?.id) {
      window.scrollTo(0, 0);
      this.loadProductIfNeeded(true);
    }
  }

  componentWillUnmount() {
    this.stopAutoScroll();
  }

  startAutoScroll = () => {
    this.scrollInterval = setInterval(() => {
      if (this.reviewScrollRef.current && !this.state.isPaused) {
        const { scrollLeft, scrollWidth, clientWidth } = this.reviewScrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 5) {
          this.reviewScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          this.reviewScrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 4000);
  };

  stopAutoScroll = () => {
    if (this.scrollInterval) clearInterval(this.scrollInterval);
  };

  loadProductIfNeeded = async (force = false) => {
    if (this.state.product && !force) return;

    const id = this.props.params?.id;
    if (!id) return;

    try {
      const res = await api.get(`/products/${id}`);
      const prod = res.data;

      // Normalize first image
      const firstImage = prod.images?.[0] || prod.image || "";
      const activeImage = firstImage && firstImage.startsWith && firstImage.startsWith('http') ? firstImage : (firstImage ? `http://localhost:5000/uploads/${firstImage}` : "");

      this.setState({
        product: prod,
        selectedSize: prod.sizes?.[0] || this.state.selectedSize,
        selectedColor: prod.colors?.[0] || this.state.selectedColor,
        activeImage
      });

      // Fetch related products (collaborative/content filtering from recommendation engine)
      try {
        this.setState({ relatedLoading: true });
        const relatedRes = await fetch(`http://localhost:5000/api/recommendations/related/${id}?category=${prod.category || ''}`);
        const relatedData = await relatedRes.json();
        if (relatedData.success) {
          this.setState({ relatedProducts: relatedData.data });
        }
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        this.setState({ relatedLoading: false });
      }

      this.fetchProductReviews();

    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  handleMouseEnter = () => this.setState({ isPaused: true });
  handleMouseLeave = () => this.setState({ isPaused: false });

  render() {
    const product = this.state.product || this.props.location?.state?.product;
    const id = this.props.params?.id;

    if (!product) {
      if (!id) return <p style={{ padding: "100px" }}>Product not found</p>;
      return <p style={{ padding: "100px" }}>Loading product...</p>;
    }

    const images =
      product.images && product.images.length
        ? product.images
        : [product.image];

    const normalizedImages = images.map(img =>
      img.startsWith('http') ? img : `http://localhost:5000/uploads/${img}`
    );

    return (
      <div className="product-page-wrapper">
        <StoreNavbar />

        {/* ================= PRODUCT ================= */}
        <section className="product-detail">
          <div className="product-detail-breadcrumbs">
            <Breadcrumbs paths={[
              { label: "Home", url: "/home" },
              { label: product.category, url: `/home?category=${product.category}` },
              { label: product.name, url: "" }
            ]} />
          </div>

          {/* LEFT: GALLERY */}
          <div className="product-gallery">
            <div className="thumbs">
              {normalizedImages.map((img, i) => (
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h1>{product.name}</h1>
              <WishlistContext.Consumer>
                {({ toggleWishlist, isInWishlist }) => (
                  <div className="wishlist-icon-btn" onClick={() => {
                    const token = localStorage.getItem("token");
                    const role = localStorage.getItem("role");
                    if (!token || role !== 'customer') {
                      this.props.navigate("/login?redirectTo=" + encodeURIComponent(window.location.pathname));
                      return;
                    }
                    toggleWishlist(product);
                  }} style={{ cursor: 'pointer', fontSize: '24px', marginTop: '10px' }}>
                    {isInWishlist(product._id) ? <AiFillHeart color="#e31b23" /> : <AiOutlineHeart />}
                  </div>
                )}
              </WishlistContext.Consumer>
            </div>

            <p className="price">
              {typeof product.price === 'number' ? `Rs. ${product.price.toLocaleString()}` : product.price}
            </p>

            <p className="desc">
              {product.description || "No description available for this product."}
            </p>

            <div className="colors">
              <span>Color:</span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => this.setState({ selectedColor: c })}
                      style={{
                        backgroundColor: c,
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: this.state.selectedColor === c ? '2px solid #111827' : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        padding: '2px',
                        backgroundClip: 'content-box',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))
                ) : (
                  <div className="color black" />
                )}
              </div>
            </div>

            <div className="size">
              <span>Size:</span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
                {product.sizes && product.sizes.length > 0 ? (
                  product.sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => this.setState({ selectedSize: s })}
                      style={{
                        padding: '6px 16px',
                        border: this.state.selectedSize === s ? '2px solid #111827' : '1px solid #e2e8f0',
                        borderRadius: '4px',
                        fontSize: '13px',
                        background: this.state.selectedSize === s ? '#111827' : 'white',
                        color: this.state.selectedSize === s ? 'white' : '#111827',
                        cursor: 'pointer',
                        fontWeight: this.state.selectedSize === s ? '600' : '400',
                        transition: 'all 0.2s'
                      }}
                    >
                      {s}
                    </button>
                  ))
                ) : (
                  <p>One Size</p>
                )}
              </div>
            </div>

            <div className="quantity-selector-container">
              <span>Quantity:</span>
              <div className="quantity-selector">
                <button onClick={() => this.handleQuantityChange(-1)}>−</button>
                <span>{this.state.quantity}</span>
                <button onClick={() => this.handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <div className="action-row">
                <button className="add-to-bag-btn" onClick={this.handleAddToBag}>
                  Add to Bag
                </button>
                <button className="buy-now-btn" onClick={this.handleBuyNow}>
                  Buy it now
                </button>
              </div>
              <button className="compare-btn" onClick={this.handleCompareProduct}>
                Compare your product
              </button>
            </div>

            <p className="stock">
              {product.stock > 0 && product.stock < 10
                ? `Only ${product.stock} item${product.stock > 1 ? 's' : ''} left in stock`
                : product.stock === 0 ? 'Out of stock' : ''
              }
            </p>

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
                {this.renderTabContent(product)}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SIZE MODAL ================= */}
        {this.state.showSizeModal && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => this.setState({ showSizeModal: false })}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                maxWidth: '90%',
                maxHeight: '90%',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => this.setState({ showSizeModal: false })}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  background: '#111827',
                  color: 'white',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >✕</button>
              <h3 style={{ marginBottom: '15px' }}>Product Size Guide</h3>
              <img
                src={`http://localhost:5000/uploads/${product.sizeChart}`}
                alt="Size Guide"
                style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        {/* ================= REVIEWS SECTION (MODERN CAROUSEL) ================= */}
        <section className="premium-reviews" ref={this.reviewFormRef}>
          <div className="reviews-header-v2">
            <span className="reviews-label">FEEDBACK</span>
            <h2>What Our Community Says</h2>
            <div className="overall-rating-v2">
              <span className="rating-num">{product.rating || "5.0"}</span>
              <div className="rating-stars-v2">★★★★★</div>
              <span className="total-revs">{this.state.productReviews.length + this.reviews.length} Verified Reviews</span>
            </div>
          </div>

          <div
            className="reviews-carousel-wrapper"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <div className="reviews-carousel" ref={this.reviewScrollRef}>
              {/* Combine hardcoded reviews with real product reviews from DB */}
              {[...this.reviews, ...this.state.productReviews.map(r => ({
                id: r._id,
                rating: r.rating,
                title: "Customer Review",
                text: r.comment,
                name: r.user?.name || "Customer",
                date: new Date(r.createdAt).toLocaleDateString(),
                verified: true
              }))].map((rev, idx) => (
                <div key={`${rev.id}-${idx}`} className="review-card-v2">
                  <div className="rev-card-top">
                    <div className="rev-stars">
                      {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                    </div>
                    <span className="rev-date">{rev.date}</span>
                  </div>

                  <h4 className="rev-title">{rev.title}</h4>
                  <p className="rev-text">{rev.text}</p>

                  <div className="rev-author-box">
                    <div className="author-avatar-initial">
                      {rev.name.charAt(0)}
                    </div>
                    <div className="author-details">
                      <span className="author-name">{rev.name}</span>
                      <span className="verified-text">Verified Purchase</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================= COMPARISON MODAL ================= */}
        {this.state.showComparisonModal && (
          <ComparisonModal 
            mainProduct={product} 
            onClose={() => this.setState({ showComparisonModal: false })} 
          />
        )}

        {/* ================= RELATED PRODUCTS (YOU MAY ALSO LIKE) ================= */}
        <RecommendationSection 
          title="You may also like" 
          products={this.state.relatedProducts} 
          loading={this.state.relatedLoading} 
        />

        <ProductFooter />
      </div>
    );
  }
}

export default withRouter(ProductDetailPage);
