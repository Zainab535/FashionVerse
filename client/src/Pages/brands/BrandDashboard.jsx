import React, { useState } from "react";
import "../../styles/brands/BrandDashboard.css";

const BrandDashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const brandData = {
    name: "Aesthetic Studio",
    logo: "FV",
    totalSales: "$45,200.00",
    salesGrowth: "+12.4%",
    activeAssets: 124,
    assetsLimit: 150,
    processing: 3,
    openOrders: 18,
    ordersStatus: "Urgent",
  };

  const recentActivity = [
    {
      id: "#FV-2 984",
      customer: "Alex Rivera",
      status: "Live",
      amount: "$249.00",
      statusColor: "success",
    },
    {
      id: "#FV-2 983",
      customer: "Jordan Smith",
      status: "Processing",
      amount: "$1120.00",
      statusColor: "warning",
    },
    {
      id: "#FV-2 982",
      customer: "Mila K.",
      status: "Live",
      amount: "$85.50",
      statusColor: "success",
    },
  ];

  const topSellers = [
    {
      id: 1,
      name: "Neon Pulse Jacket",
      image: "👕",
      sales: "24 sales this week",
      revenue: "$145",
    },
    {
      id: 2,
      name: "Aero Glide Sneakers",
      image: "👟",
      sales: "28 sales this week",
      revenue: "$210",
    },
    {
      id: 3,
      name: "Chronos Digital V1",
      image: "⌚",
      sales: "12 sales this week",
      revenue: "$89",
    },
  ];

  // Orders data
  const orders = [
    {
      id: "#FV-9021-X",
      time: "Today, 10:45 AM",
      product: "CyberRunner Gen.1 (Silver)",
      category: "3D Digital Ownership",
      avatar: "👟",
      customer: "Hiroshi Tanaka",
      status: "Pending Sync",
      statusColor: "warning",
    },
    {
      id: "#FV-894 2-L",
      time: "Yesterday, 2:00 PM",
      product: "Neon-Void Puffer [Holographic]",
      category: "Wearable Asset",
      avatar: "🧥",
      customer: "Elena Rodriguez",
      status: "Shipped",
      statusColor: "success",
    },
    {
      id: "#FV-893 0-M",
      time: "Jan 13, 2024",
      product: "Prism-Optic Glasses v4",
      category: "Avatar Accessory",
      avatar: "👓",
      customer: "Marcus Chen",
      status: "Delivered",
      statusColor: "success",
    },
    {
      id: "#FV-8911-W",
      time: "Jan 12, 2024",
      product: "Liquid Silk Gown #02",
      category: "Luxury Asset",
      avatar: "👗",
      customer: "Sophie Laurent",
      status: "Pending Sync",
      statusColor: "warning",
    },
  ];

  // Inventory data
  const inventoryItems = [
    {
      sku: "FV-CRG1-SLV",
      name: "CyberRunner Gen.1 (Silver)",
      category: "Footwear",
      stock: 42,
      price: "$240.00",
      image: "👟",
    },
    {
      sku: "FV-NVPH-001",
      name: "Neon-Void Puffer [Holo]",
      category: "Wearables",
      stock: 8,
      price: "$1,200.00",
      image: "🧥",
    },
    {
      sku: "FV-POGV-400",
      name: "Prism-Optic Glasses v4",
      category: "Accessories",
      stock: 124,
      price: "$85.00",
      image: "👓",
    },
    {
      sku: "FV-LSG2-WHT",
      name: "Liquid Silk Gown #02",
      category: "Wearables",
      stock: 0,
      price: "$3,500.00",
      image: "👗",
    },
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "orders", label: "Orders", icon: "🛒", badge: "18" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "3d-assets", label: "3D Assets", icon: "🎨" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="brand-dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="brand-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">FV</div>
          <div className="logo-text">
            <h3>FashionVerse</h3>
            <p>Brand Console</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSidebarItem === item.id ? "active" : ""}`}
              onClick={() => setActiveSidebarItem(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="add-product-btn">+ Add New Product</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="brand-main-content">
        {/* HEADER */}
        <header className="brand-header">
          <div className="header-left">
            <h1 className="brand-name">
              {activeSidebarItem === "dashboard" && brandData.name}
              {activeSidebarItem === "orders" && "Order Management"}
              {activeSidebarItem === "inventory" && "Inventory Management"}
              {activeSidebarItem === "settings" && "Store Settings"}
              {!["dashboard", "orders", "inventory", "settings"].includes(activeSidebarItem) && brandData.name}
            </h1>
            <p className="brand-subtitle">
              {activeSidebarItem === "dashboard" && "Performance report for the current fiscal month."}
              {activeSidebarItem === "orders" && "Manage and track your brand orders"}
              {activeSidebarItem === "inventory" && "Manage your product inventory"}
              {activeSidebarItem === "settings" && "Store profile and security settings"}
            </p>
          </div>

          <div className="header-right">
            {activeSidebarItem === "dashboard" && (
              <div className="header-tabs">
                <button
                  className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  className={`tab-btn ${activeTab === "brand" ? "active" : ""}`}
                  onClick={() => setActiveTab("brand")}
                >
                  Brand
                </button>
              </div>
            )}

            <div className="header-controls">
              <input
                type="text"
                placeholder={activeSidebarItem === "orders" ? "Search orders..." : activeSidebarItem === "inventory" ? "Search inventory..." : "Search orders, products..."}
                className="search-input"
              />
              <button className="icon-btn notification-btn">🔔</button>
              <button className="icon-btn profile-btn">👤</button>
              <span className="brand-owner">Brand Owner</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        {activeSidebarItem === "dashboard" && (
          <div className="dashboard-content">
            {/* STATS CARDS */}
            <div className="stats-grid">
              <div className="stat-card total-sales">
                <div className="stat-header">
                  <h3>Total Sales</h3>
                  <span className="stat-growth positive">+12.4%</span>
                </div>
                <div className="stat-value">{brandData.totalSales}</div>
                <div className="stat-footer">
                  <span className="stat-date">Last 30 Days</span>
                  <button className="export-btn">📥 Export</button>
                </div>
              </div>

              <div className="stat-card active-assets">
                <h3>Active Assets</h3>
                <div className="asset-display">
                  <span className="asset-current">{brandData.activeAssets}</span>
                  <span className="asset-limit">/{brandData.assetsLimit} Limit</span>
                </div>
                <div className="asset-bar">
                  <div className="asset-progress" style={{ width: `${(brandData.activeAssets / brandData.assetsLimit) * 100}%` }}></div>
                </div>
              </div>

              <div className="stat-card processing">
                <h3>{brandData.processing} Processing</h3>
                <div className="status-dots">
                  <span className="dot dot-1"></span>
                  <span className="dot dot-2"></span>
                  <span className="dot dot-3"></span>
                </div>
              </div>

              <div className="stat-card open-orders">
                <div className="order-header">
                  <h3>Open Orders</h3>
                  <span className="order-status urgent">{brandData.ordersStatus}</span>
                </div>
                <div className="order-count">{brandData.openOrders}</div>
                <a href="#" className="order-link">Review pending shipments →</a>
              </div>
            </div>

            {/* RECENT ACTIVITY & TOP SELLERS */}
            <div className="dashboard-grid">
              <div className="card recent-activity-card">
                <div className="card-header">
                  <h2>Recent Activity</h2>
                  <a href="#" className="view-all">View All</a>
                </div>
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>3D Model Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id}>
                        <td className="order-id">{activity.id}</td>
                        <td className="customer-name">{activity.customer}</td>
                        <td>
                          <span className={`status-badge ${activity.statusColor}`}>
                            ● {activity.status}
                          </span>
                        </td>
                        <td className="amount">{activity.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="card top-sellers-card">
                <div className="card-header">
                  <h2>Top Sellers</h2>
                  <a href="#" className="time-filter">7 Days</a>
                </div>
                <div className="sellers-list">
                  {topSellers.map((seller) => (
                    <div key={seller.id} className="seller-item">
                      <div className="seller-avatar">{seller.image}</div>
                      <div className="seller-info">
                        <h4>{seller.name}</h4>
                        <p>{seller.sales}</p>
                      </div>
                      <div className="seller-revenue">${seller.revenue}</div>
                    </div>
                  ))}
                </div>
                <a href="#" className="see-all-metrics">See All Performance Metrics</a>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS CONTENT */}
        {activeSidebarItem === "orders" && (
          <div className="dashboard-content">
            <div className="orders-stats-grid">
              <div className="order-stat-card">
                <div className="order-stat-label">Total Volume</div>
                <div className="order-stat-value">124</div>
                <div className="order-stat-change">📈 +12.4%</div>
              </div>
              <div className="order-stat-card">
                <div className="order-stat-label">Pending Sync</div>
                <div className="order-stat-value">12</div>
                <div className="order-stat-change warning">⚠️ Action</div>
              </div>
              <div className="order-stat-card">
                <div className="order-stat-label">In Transit</div>
                <div className="order-stat-value">45</div>
                <div className="order-stat-change secondary">📦 Outbound</div>
              </div>
              <div className="order-stat-card">
                <div className="order-stat-label">Delivered</div>
                <div className="order-stat-value">67</div>
                <div className="order-stat-change success">✓ 100% Rate</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Orders List</h2>
                <div className="filter-tabs">
                  <button className="filter-tab active">All Orders</button>
                  <button className="filter-tab">Pending</button>
                  <button className="filter-tab">Shipped</button>
                  <button className="filter-tab">Delivered</button>
                </div>
              </div>

              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product Details</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="order-info">
                          <div className="order-id-primary">{order.id}</div>
                          <div className="order-time">{order.time}</div>
                        </div>
                      </td>
                      <td>
                        <div className="product-info">
                          <div className="product-avatar">{order.avatar}</div>
                          <div>
                            <div className="product-name">{order.product}</div>
                            <div className="product-category">{order.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="customer-name">{order.customer}</td>
                      <td>
                        <span className={`status-badge ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="update-status-btn">Update Status</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <span>Showing 1-4 of 124 orders</span>
                <div className="pagination-controls">
                  <button>‹</button>
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>›</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY CONTENT */}
        {activeSidebarItem === "inventory" && (
          <div className="dashboard-content">
            <div className="inventory-stats-grid">
              <div className="inventory-stat-card">
                <div className="inventory-stat-label">Total Products</div>
                <div className="inventory-stat-value">842</div>
                <div className="inventory-stat-meta">📋 Catalog</div>
              </div>
              <div className="inventory-stat-card">
                <div className="inventory-stat-label">Low Stock</div>
                <div className="inventory-stat-value">18</div>
                <div className="inventory-stat-meta warning">⚠️ Action Required</div>
              </div>
              <div className="inventory-stat-card">
                <div className="inventory-stat-label">Out of Stock</div>
                <div className="inventory-stat-value">4</div>
                <div className="inventory-stat-meta critical">🔴 Critical</div>
              </div>
              <div className="inventory-stat-card">
                <div className="inventory-stat-label">Categories</div>
                <div className="inventory-stat-value">12</div>
                <div className="inventory-stat-meta">📂 Range</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Products</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="filter-tab active">All Products</button>
                  <button className="filter-tab">Wearables</button>
                  <button className="filter-tab">Accessories</button>
                  <button className="filter-tab">Footwear</button>
                  <a href="#" style={{ marginLeft: "auto", color: "#00d4ff", fontWeight: "700", fontSize: "12px" }}>Advanced Filters</a>
                </div>
              </div>

              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock Level</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.sku}>
                      <td>
                        <div className="inventory-image">{item.image}</div>
                      </td>
                      <td className="sku-code">{item.sku}</td>
                      <td className="product-name">{item.name}</td>
                      <td className="category-tag">{item.category}</td>
                      <td>
                        <span className={`stock-badge ${item.stock === 0 ? 'critical' : item.stock < 20 ? 'warning' : 'success'}`}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="price">{item.price}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit">✏️</button>
                          <button className="action-btn delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <span>Showing 1-4 of 842 products</span>
                <div className="pagination-controls">
                  <button>‹</button>
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>›</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS CONTENT */}
        {activeSidebarItem === "settings" && (
          <div className="dashboard-content">
            <div className="settings-container">
              <div className="settings-tabs">
                <button className="settings-tab active">Store Profile</button>
                <button className="settings-tab">Account Security</button>
                <button className="settings-tab">Notifications</button>
              </div>

              <div className="card settings-card">
                <h3 className="settings-section-title">Store Branding</h3>
                <div className="settings-grid">
                  <div className="settings-item">
                    <label>Store Logo</label>
                    <div className="logo-upload">
                      <div className="logo-preview">FV</div>
                      <button className="upload-btn">Choose Logo</button>
                    </div>
                  </div>
                  <div className="settings-item">
                    <label>Banner Image</label>
                    <div className="banner-upload">
                      <div className="banner-preview">🖼️</div>
                      <button className="upload-btn">Choose Banner</button>
                    </div>
                  </div>
                </div>

                <h3 className="settings-section-title" style={{ marginTop: "32px" }}>General Information</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Store Name</label>
                    <input type="text" value="Alexander McQueen Digital" />
                  </div>
                  <div className="form-group">
                    <label>Store Email</label>
                    <input type="email" value="support@mcqueen-digital.com" />
                  </div>
                </div>

                <div className="settings-form">
                  <div className="form-group">
                    <label>Store Description</label>
                    <textarea rows="4">A visionary exploration of luxury 3D fashion assets. Pushing the boundaries of digital ownership and avatar high-culture.</textarea>
                  </div>
                </div>

                <h3 className="settings-section-title" style={{ marginTop: "32px" }}>Contact & Support</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Support Email</label>
                    <input type="email" value="support@mcqueen-digital.com" />
                  </div>
                  <div className="form-group">
                    <label>Business Phone</label>
                    <input type="tel" value="+44 20 7355 0068" />
                  </div>
                </div>

                <h3 className="settings-section-title" style={{ marginTop: "32px" }}>Quick Notifications</h3>
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Order Placement</h4>
                      <p>Receive alerts when a new order is received</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Inventory Alerts</h4>
                      <p>Get notified when items are low (20 days ahead)</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="btn-discard">Discard Changes</button>
                  <button className="btn-save">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandDashboard;
