import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/brands/BrandDashboard.css";

const BrandDashboard = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - will be replaced with API calls
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
      revenue: "$14",
    },
    {
      id: 2,
      name: "Aero Glide Sneakers",
      image: "👟",
      sales: "28 sales this week",
      revenue: "$21",
    },
    {
      id: 3,
      name: "Chronos Digital V1",
      image: "⌚",
      sales: "12 sales this week",
      revenue: "$8",
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
            <p>Brand Platform</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to="#"
              className={`nav-item ${activeSidebarItem === item.id ? "active" : ""}`}
              onClick={() => setActiveSidebarItem(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
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
            <h1 className="brand-name">{brandData.name}</h1>
            <p className="brand-subtitle">Performance report for the current fiscal month.</p>
          </div>

          <div className="header-right">
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

            <div className="header-controls">
              <input
                type="text"
                placeholder="Search orders, products..."
                className="search-input"
              />
              <button className="icon-btn notification-btn">🔔</button>
              <button className="icon-btn profile-btn">👤</button>
              <span className="brand-owner">Brand Owner</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="dashboard-content">
          {/* STATS CARDS */}
          <div className="stats-grid">
            <div className="stat-card total-sales">
              <div className="stat-header">
                <h3>Total Sales</h3>
                <span className="stat-growth">+12.4%</span>
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
                <span className="asset-limit">/{brandData.assetsLimit}</span>
              </div>
              <div className="asset-bar">
                <div className="asset-progress" style={{ width: `${(brandData.activeAssets / brandData.assetsLimit) * 100}%` }}></div>
              </div>
            </div>

            <div className="stat-card processing">
              <h3>3 Processing</h3>
              <div className="status-dots">
                <span className="dot" style={{ backgroundColor: "#0099ff" }}></span>
                <span className="dot" style={{ backgroundColor: "#00ccff" }}></span>
                <span className="dot" style={{ backgroundColor: "#99eeff" }}></span>
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
            {/* RECENT ACTIVITY */}
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
                    <th>Status</th>
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
                          {activity.status}
                        </span>
                      </td>
                      <td className="amount">{activity.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOP SELLERS */}
            <div className="card top-sellers-card">
              <div className="card-header">
                <h2>Top Sellers</h2>
                <a href="#" className="time-filter">7 Days</a>
              </div>
              <div className="sellers-list">
                {topSellers.map((seller) => (
                  <div key={seller.id} className="seller-item">
                    <div className="seller-image">{seller.image}</div>
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
      </main>
    </div>
  );
};

export default BrandDashboard;
