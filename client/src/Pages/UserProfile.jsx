import React, { Component } from "react";
import { Link } from "react-router-dom";
import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import dashboardIcon from "../assets/icons/dashboard.svg";
import reviewsIcon from "../assets/icons/reviews.svg";
import wishlistIcon from "../assets/icons/my-wish-list.png";
import orderIcon from "../assets/icons/local_mall.png";
import settingsIcon from "../assets/icons/person.svg";
import paymentIcon from "../assets/icons/credit_card.svg";
import locationIcon from "../assets/icons/location_on.svg";
import calendarIcon from "../assets/icons/calendar_month.png";
import cameraIcon from "../assets/icons/photo_camera.svg";
import "../styles/UserProfile.css";

class UserProfile extends Component {
  state = {
    user: {
      name: "Isabella Rossi",
      bio: "Fashion enthusiast & digital collector. Obsessed with sustainable luxury and virtual drops.",
      location: "Milan, Italy",
      joinedDate: "Joined 2021",
      profileImage: null,
      verified: true,
    },
    activeTab: "overview",
    recentOrders: [
      {
        id: 1,
        name: "Structured Wool Coat",
        size: "Size: M • Ridge",
        status: "Delivered",
        price: "$895.00",
        image: null,
        date: "Order #851201",
      },
      {
        id: 2,
        name: "Leather Ankle Boots",
        size: "Size: 39 • Black",
        status: "Shipped",
        price: "$450.00",
        image: null,
        date: "Order #851202",
      },
      {
        id: 3,
        name: "Silk Evening Dress",
        size: "Size: S • Navy",
        status: "Processing",
        price: "$650.00",
        image: null,
        date: "Order #851203",
      },
    ],
    digitalWardrobe: [
      {
        id: 1,
        name: "Chrome Bag V.02",
        type: "NFT Asset",
        image: null,
      },
    ],
    wishlist: [
      {
        id: 1,
        name: "Premium Cashmere Sweater",
        price: "$320.00",
        image: null,
      },
      {
        id: 2,
        name: "Designer Sunglasses",
        price: "$450.00",
        image: null,
      },
    ],
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { user, activeTab, recentOrders, digitalWardrobe, wishlist } = this.state;

    return (
      <>
        <StoreNavbar />
        <main className="profile-container">
          {/* Profile Header */}
          <section className="profile-header">
            <div className="profile-header-content">
              <div className="profile-info-wrapper">
                <div className="profile-avatar">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  {user.verified && (
                    <div className="verified-badge">
                      <img src={cameraIcon} alt="" className="camera-badge-icon" />
                    </div>
                  )}
                </div>

                <div className="profile-details">
                  <h1>{user.name}</h1>
                  <p className="bio">{user.bio}</p>
                  <div className="profile-meta">
                    <span className="location">
                      <img src={locationIcon} alt="" className="meta-icon" />
                      {user.location}
                    </span>
                    <span className="joined">
                      <img src={calendarIcon} alt="" className="meta-icon" />
                      {user.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn-primary">Edit Profile</button>
                <button className="btn-secondary">Share</button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="profile-content">
            {/* Sidebar */}
            <aside className="profile-sidebar">
              <div className="sidebar-section">
                <h3>Dashboard</h3>
                <nav className="sidebar-nav">
                  <button
                    className={`sidebar-link ${activeTab === "overview" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("overview")}
                  >
                    <img src={dashboardIcon} alt="" className="sidebar-icon" />
                    Overview
                  </button>
                  <button
                    className={`sidebar-link ${activeTab === "orders" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("orders")}
                  >
                    <img src={orderIcon} alt="" className="sidebar-icon" />
                    My Orders
                  </button>
                  <button
                    className={`sidebar-link ${activeTab === "wishlist" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("wishlist")}
                  >
                    <img src={wishlistIcon} alt="" className="sidebar-icon" />
                    Wishlist (4)
                  </button>
                  <button
                    className={`sidebar-link ${activeTab === "reviews" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("reviews")}
                  >
                    <img src={reviewsIcon} alt="" className="sidebar-icon" />
                    Reviews
                  </button>
                </nav>
              </div>

              <div className="sidebar-section">
                <h3>Account</h3>
                <nav className="sidebar-nav">
                  <button
                    className={`sidebar-link ${activeTab === "settings" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("settings")}
                  >
                    <img src={settingsIcon} alt="" className="sidebar-icon" />
                    Profile Settings
                  </button>
                  <button
                    className={`sidebar-link ${activeTab === "payment" ? "active" : ""}`}
                    onClick={() => this.handleTabChange("payment")}
                  >
                    <img src={paymentIcon} alt="" className="sidebar-icon" />
                    Payment Methods
                  </button>
                </nav>
              </div>

              <div className="sidebar-section">
                <button className="btn-signout">🚪 Sign Out</button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="profile-main">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="tab-content overview-tab">
                  <div className="content-grid">
                    {/* Recent Orders */}
                    <div className="content-section">
                      <div className="section-header">
                        <h2>Recent Orders</h2>
                        <a href="#" className="view-all">
                          View All
                        </a>
                      </div>

                      <div className="orders-list">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="order-card">
                            <div className="order-image">
                              {order.image ? (
                                <img src={order.image} alt={order.name} />
                              ) : (
                                <div className="image-placeholder"></div>
                              )}
                            </div>
                            <div className="order-info">
                              <h4>{order.name}</h4>
                              <p className="order-meta">{order.size}</p>
                              <p className="order-date">{order.date}</p>
                            </div>
                            <div className="order-status">
                              <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="order-price">
                              <p>{order.price}</p>
                              <a href="#" className="track-link">
                                Track Item
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Digital Wardrobe */}
                    <div className="content-section wardrobe-section">
                      <div className="section-header">
                        <h2>Digital Wardrobe</h2>
                      </div>

                      {digitalWardrobe.length > 0 ? (
                        <div className="wardrobe-container">
                          {digitalWardrobe.map((item) => (
                            <div key={item.id} className="wardrobe-item">
                              {item.image ? (
                                <img src={item.image} alt={item.name} />
                              ) : (
                                <div className="wardrobe-placeholder"></div>
                              )}
                              <div className="wardrobe-label">{item.type}</div>
                              <p>{item.name}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="empty-state">Your digital wardrobe is empty</p>
                      )}
                    </div>
                  </div>

                  {/* Last Viewed */}
                  <div className="last-viewed-section">
                    <div className="section-header">
                      <h2>Last Viewed</h2>
                    </div>
                    <div className="last-viewed-item">
                      <div className="viewed-image">
                        <div className="image-placeholder-large"></div>
                      </div>
                      <div className="viewed-info">
                        <p className="viewed-label">Last Viewed</p>
                        <h3>Chrome Bag V.02</h3>
                        <button className="btn-explore">Explore Item →</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="tab-content orders-tab">
                  <h2>My Orders</h2>
                  <div className="orders-list">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-image">
                          {order.image ? (
                            <img src={order.image} alt={order.name} />
                          ) : (
                            <div className="image-placeholder"></div>
                          )}
                        </div>
                        <div className="order-info">
                          <h4>{order.name}</h4>
                          <p className="order-meta">{order.size}</p>
                          <p className="order-date">{order.date}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-price">
                          <p>{order.price}</p>
                          <a href="#" className="track-link">
                            Track Item
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="tab-content wishlist-tab">
                  <h2>My Wishlist</h2>
                  <div className="wishlist-grid">
                    {wishlist.map((item) => (
                      <div key={item.id} className="wishlist-card">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="image-placeholder-wishlist"></div>
                        )}
                        <div className="wishlist-info">
                          <h4>{item.name}</h4>
                          <p className="wishlist-price">{item.price}</p>
                          <button className="btn-small">Add to Cart</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="tab-content reviews-tab">
                  <h2>My Reviews</h2>
                  <div className="reviews-container">
                    <p className="empty-state">No reviews yet. Start shopping to leave your first review!</p>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="tab-content settings-tab">
                  <h2>Profile Settings</h2>
                  <form className="settings-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" value={user.name} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" value="isabella@example.com" readOnly />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" value={user.location} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea value={user.bio} readOnly></textarea>
                    </div>
                    <button type="button" className="btn-primary">
                      Update Settings
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === "payment" && (
                <div className="tab-content payment-tab">
                  <h2>Payment Methods</h2>
                  <div className="payment-methods">
                    <div className="payment-card">
                      <h4>💳 Credit Card</h4>
                      <p>****1234</p>
                      <p className="exp-date">Expires: 12/25</p>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ marginTop: "24px" }}>
                    Add Payment Method
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
        <StoreFooter />
      </>
    );
  }
}

export default UserProfile;
