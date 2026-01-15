import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import "../styles/BrandProducts.css";

// Brand data
const brandsData = {
  brand1: {
    id: "brand1",
    name: "LUXE ELEGANCE",
    tagline: "Premium Fashion Redefined",
    description: "Experience the pinnacle of luxury with LUXE ELEGANCE. Our curated collections blend contemporary design with timeless elegance, creating pieces that transcend trends.",
    categories: ["Men", "Women", "Kids"],
    featuredProducts: [
      { id: 1, name: "Premium Wool Coat", category: "Men", price: "$450", rating: 4.8, reviews: 128 },
      { id: 2, name: "Silk Evening Dress", category: "Women", price: "$650", rating: 4.9, reviews: 95 },
      { id: 3, name: "Classic Leather Jacket", category: "Men", price: "$520", rating: 4.7, reviews: 142 },
      { id: 4, name: "Designer Handbag", category: "Women", price: "$380", rating: 4.8, reviews: 156 },
    ],
    collections: [
      { name: "Summer Collection 2024", items: 45 },
      { name: "Winter Essentials", items: 38 },
      { name: "Casual Wear", items: 52 },
    ],
  },
  brand2: {
    id: "brand2",
    name: "STYLE STUDIOS",
    tagline: "Where Art Meets Fashion",
    description: "STYLE STUDIOS transforms everyday moments into extraordinary experiences through innovative design and sustainable craftsmanship. Discover a world of style.",
    categories: ["Men", "Women", "Kids"],
    featuredProducts: [
      { id: 5, name: "Canvas Sneakers", category: "Men", price: "$120", rating: 4.6, reviews: 89 },
      { id: 6, name: "Relaxed Fit Jeans", category: "Women", price: "$95", rating: 4.7, reviews: 123 },
      { id: 7, name: "Graphic T-Shirt", category: "Men", price: "$45", rating: 4.5, reviews: 67 },
      { id: 8, name: "Trendy Sunglasses", category: "Women", price: "$180", rating: 4.9, reviews: 201 },
    ],
    collections: [
      { name: "Urban Collection", items: 56 },
      { name: "Sports Line", items: 42 },
      { name: "Kids Fashion", items: 38 },
    ],
  },
  brand3: {
    id: "brand3",
    name: "HAUTE COUTURE",
    tagline: "Elegance in Every Stitch",
    description: "HAUTE COUTURE represents the epitome of French fashion excellence. Each piece is meticulously crafted to celebrate individuality and sophisticated taste.",
    categories: ["Men", "Women", "Kids"],
    featuredProducts: [
      { id: 9, name: "Embroidered Gown", category: "Women", price: "$850", rating: 5.0, reviews: 76 },
      { id: 10, name: "Tailored Blazer", category: "Men", price: "$580", rating: 4.8, reviews: 112 },
      { id: 11, name: "Sequin Dress", category: "Women", price: "$720", rating: 4.9, reviews: 98 },
      { id: 12, name: "Italian Leather Shoes", category: "Men", price: "$420", rating: 4.7, reviews: 135 },
    ],
    collections: [
      { name: "Formal Wear", items: 48 },
      { name: "Evening Collection", items: 35 },
      { name: "Accessories", items: 62 },
    ],
  },
  brand4: {
    id: "brand4",
    name: "STREETVIBE",
    tagline: "Urban Fashion Revolution",
    description: "STREETVIBE brings energy and attitude to fashion. We celebrate authenticity, individuality, and the vibrant culture of street fashion.",
    categories: ["Men", "Women", "Kids"],
    featuredProducts: [
      { id: 13, name: "Oversized Hoodie", category: "Men", price: "$85", rating: 4.7, reviews: 234 },
      { id: 14, name: "Cargo Pants", category: "Women", price: "$120", rating: 4.6, reviews: 167 },
      { id: 15, name: "Streetwear Jacket", category: "Men", price: "$240", rating: 4.8, reviews: 189 },
      { id: 16, name: "High-Top Sneakers", category: "Women", price: "$160", rating: 4.7, reviews: 210 },
    ],
    collections: [
      { name: "Street Culture", items: 64 },
      { name: "Limited Drops", items: 28 },
      { name: "Collaborations", items: 19 },
    ],
  },
};

// Wrapper component to use useParams
function BrandProductsWrapper() {
  const { brandId } = useParams();
  return <BrandProductsPage brandId={brandId} />;
}

class BrandProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "All",
      brandData: brandsData[this.props.brandId] || brandsData.brand1,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { brandData, selectedCategory } = this.state;

    const filteredProducts =
      selectedCategory === "All"
        ? brandData.featuredProducts
        : brandData.featuredProducts.filter((p) => p.category === selectedCategory);

    return (
      <>
        <StoreNavbar />
        <main className="brand-products-container">
          {/* Brand Hero Section */}
          <section className="brand-hero">
            <div className="brand-hero-content">
              <div className="brand-header-info">
                <h1>{brandData.name}</h1>
                <p className="brand-tagline">{brandData.tagline}</p>
                <p className="brand-description">{brandData.description}</p>
                <button className="btn-explore">Explore Collection</button>
              </div>
            </div>
          </section>

          {/* Brand Content */}
          <section className="brand-content">
            {/* Categories Section */}
            <div className="categories-section">
              <h2>Shop by Category</h2>
              <div className="categories-grid">
                <button
                  className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
                  onClick={() => this.handleCategoryChange("All")}
                >
                  All Products
                </button>
                {brandData.categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => this.handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Products Section */}
            <div className="featured-section">
              <h2>Featured Products</h2>
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <div className="image-placeholder"></div>
                      <div className="product-overlay">
                        <button className="btn-quick-view">Quick View</button>
                        <button className="btn-add-cart">Add to Cart</button>
                      </div>
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <div className="product-rating">
                        <span className="rating">⭐ {product.rating}</span>
                        <span className="reviews">({product.reviews})</span>
                      </div>
                      <p className="product-price">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collections Section */}
            <div className="collections-section">
              <h2>Brand Collections</h2>
              <div className="collections-grid">
                {brandData.collections.map((collection, idx) => (
                  <div key={idx} className="collection-card">
                    <div className="collection-image">
                      <div className="collection-placeholder"></div>
                    </div>
                    <div className="collection-info">
                      <h3>{collection.name}</h3>
                      <p>{collection.items} Items</p>
                      <Link to="#" className="view-collection">
                        View Collection →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Story Section */}
            <div className="brand-story-section">
              <div className="story-content">
                <h2>The {brandData.name} Story</h2>
                <p>
                  {brandData.name} stands as a beacon of excellence in the fashion industry. With years of expertise
                  and a commitment to quality, we craft pieces that tell stories and inspire confidence. Every garment
                  is a testament to our dedication to innovation, sustainability, and timeless style.
                </p>
                <div className="story-highlights">
                  <div className="highlight">
                    <h4>🎯 Craftsmanship</h4>
                    <p>Meticulously crafted with premium materials</p>
                  </div>
                  <div className="highlight">
                    <h4>🌍 Global Reach</h4>
                    <p>Available in 50+ countries worldwide</p>
                  </div>
                  <div className="highlight">
                    <h4>♻️ Sustainability</h4>
                    <p>Committed to eco-friendly practices</p>
                  </div>
                  <div className="highlight">
                    <h4>⭐ Award Winning</h4>
                    <p>Recognized for design excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
              <h2>Experience {brandData.name}</h2>
              <p>Join our community and stay updated with the latest collections and exclusive offers</p>
              <button className="btn-primary">Subscribe to Newsletter</button>
            </div>
          </section>
        </main>
        <StoreFooter />
      </>
    );
  }
}

export default BrandProductsWrapper;
