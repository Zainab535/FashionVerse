import React, { Component } from "react";
import "../../styles/brands/BrandDashboard.css";

// Import icons
import dashboardIcon from "../../assets/icons/dashboard.svg";
import inventoryIcon from "../../assets/icons/inventory_2.png";
import ordersIcon from "../../assets/icons/local_mall.png";
import customersIcon from "../../assets/icons/cutomer-group.svg";
import settingsIcon from "../../assets/icons/settings.png";
import searchIcon from "../../assets/icons/search.svg";
import bellIcon from "../../assets/icons/bell-icon.png";

import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Inventory from "./Inventory";
import Settings from "./Setting";
import AddProduct from "./AddProduct";

class BrandDashboard extends Component {
  state = {
    activePage: "dashboard",
    activeTab: "overview"
  };

  renderPage = () => {
    const { activePage } = this.state;

    switch (activePage) {
      case "orders":
        return <Orders />;
      case "inventory":
        return <Inventory onAddProduct={() => this.setState({ activePage: 'add-product' })} />;
      case "settings":
        return <Settings />;
      case "add-product":
        return <AddProduct onBack={() => this.setState({ activePage: 'inventory' })} />;
      default:
        return <Dashboard />;
    }
  };

  getSearchPlaceholder = () => {
    const { activePage } = this.state;
    if (activePage === "orders") return "Search orders...";
    if (activePage === "inventory") return "Search inventory...";
    return "Search orders, products...";
  };

  render() {
    const { activePage, activeTab } = this.state;
    const isEditing = activePage === 'add-product';

    return (
      <div className="brand-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="brand-sidebar">
          <div className="sidebar-header">
            <div className="logo-icon">FV</div>
            <div className="logo-text">
              <h2 className="brand-logo" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>FashionVerse</h2>
              <span className="brand-subtitle">Brand Portal</span>
            </div>
          </div>

          <nav className="brand-nav">
            <button
              className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
              onClick={() => this.setState({ activePage: "dashboard" })}
            >
              <img src={dashboardIcon} alt="Dashboard" className="nav-icon-img" />
              Dashboard
            </button>

            <button
              className={`nav-item ${activePage === "orders" ? "active" : ""}`}
              onClick={() => this.setState({ activePage: "orders" })}
            >
              <img src={ordersIcon} alt="Orders" className="nav-icon-img" />
              Orders
              <span className="nav-badge">18</span>
            </button>

            <button
              className={`nav-item ${activePage === "inventory" || activePage === 'add-product' ? "active" : ""}`}
              onClick={() => this.setState({ activePage: "inventory" })}
            >
              <img src={inventoryIcon} alt="Inventory" className="nav-icon-img" />
              Inventory
            </button>

            <button className="nav-item">
              <img src={customersIcon} alt="Customers" className="nav-icon-img" />
              Customers
            </button>
          </nav>

          <div className="sidebar-footer">
            <button
              className={`nav-item ${activePage === "settings" ? "active" : ""}`}
              onClick={() => this.setState({ activePage: "settings" })}
            >
              <img src={settingsIcon} alt="Settings" className="nav-icon-img" />
              Settings
            </button>
            <button className="add-product-btn" style={{ background: '#000', color: '#fff', borderRadius: '4px' }}>
              <span style={{ fontSize: '14px' }}>↗</span> View Live Store
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="brand-content">

          {/* Top Header - Hidden on "Add Product" since it has its own header in the image */}
          {!isEditing && (
            <header className="brand-header">
              <div className="header-tabs">
                <button
                  className={`tab-btn ${activeTab === "brand" ? "active" : ""}`}
                  onClick={() => this.setState({ activeTab: "brand" })}
                  style={{ border: activeTab === 'brand' ? '1.5px solid #111827' : '1px solid #e2e8f0', borderRadius: '8px', color: activeTab === 'brand' ? '#111827' : '#64748b' }}
                >
                  Brand
                </button>
                <button
                  className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => this.setState({ activeTab: "overview" })}
                >
                  Overview
                </button>
              </div>

              <div className="header-center" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="search-box" style={{ width: '280px', borderRadius: '4px', background: '#f1f5f9' }}>
                  <img src={searchIcon} alt="Search" className="search-icon-img" />
                  <input
                    type="text"
                    placeholder={this.getSearchPlaceholder()}
                    className="search-input"
                  />
                </div>
                {activePage === 'inventory' && (
                  <button
                    className="primary-btn"
                    style={{ borderRadius: '6px', fontSize: '12px', padding: '10px 15px' }}
                    onClick={() => this.setState({ activePage: 'add-product' })}
                  >
                    + Add New Product
                  </button>
                )}
              </div>

              <div className="header-right">
                <button className="icon-btn">
                  <img src={bellIcon} alt="Notifications" className="bell-icon-img" />
                </button>
                <div className="user-profile">
                  <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    <div className="user-name" style={{ fontSize: '13px', lineHeight: '1', fontWeight: '700' }}>Alexander McQueen</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Administrator</div>
                  </div>
                  <div className="user-avatar" style={{ background: '#e2e8f0', width: '36px', height: '36px' }}></div>
                </div>
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className="page-content">
            {this.renderPage()}
          </div>
        </main>

      </div>
    );
  }
}

export default BrandDashboard;
