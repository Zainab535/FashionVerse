import React, { Component } from "react";
import "../../styles/brands/BrandDashboard.css";

class Orders extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                {/* HEADER AREA */}
                <div className="subpage-header">
                    <div>
                        <h1>Order Management</h1>
                        <p className="muted">Track and manage your customer orders.</p>
                    </div>
                    <div className="dash-actions">
                        <button className="pill-tab" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                            Filter by Date
                        </button>
                    </div>
                </div>

                {/* STATS ROW */}
                <div className="dash-stats">
                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Total Volume</span>
                        </div>
                        <h2 className="stat-value">124</h2>
                        <span className="pill success">+12.4%</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Pending Sync</span>
                        </div>
                        <h2 className="stat-value">12</h2>
                        <span className="pill warning">Active</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">In Transit</span>
                        </div>
                        <h2 className="stat-value">45</h2>
                        <span className="pill info">8 Outbound</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Delivered</span>
                        </div>
                        <h2 className="stat-value">67</h2>
                        <span className="pill success">100% Rate</span>
                    </div>
                </div>

                {/* FILTER BAR */}
                <div className="filter-bar">
                    <div className="tabs-group">
                        <button className="pill-tab active">All Orders</button>
                        <button className="pill-tab">Pending</button>
                        <button className="pill-tab">Shipped</button>
                        <button className="pill-tab">Delivered</button>
                    </div>
                </div>

                {/* LIST SECTION */}
                <div className="list-container">
                    <div className="list-header orders-list-grid">
                        <div>Order ID</div>
                        <div>Product Details</div>
                        <div>Customer</div>
                        <div>Status</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                    </div>

                    {/* ORDER ITEMS */}
                    {[
                        { id: '#FV-9021-X', date: 'Today, 10:45 AM', product: 'CyberRunner Gen.1 (Silver)', cat: '3D Digital Ownership', customer: 'Hiroshi Tanaka', status: 'Pending Sync', statusType: 'warning' },
                        { id: '#FV-8942-L', date: 'Yesterday, 4:20 PM', product: 'Neon-Void Puffer [Holographic]', cat: 'Wearable Asset', customer: 'Elena Rodriguez', status: 'Shipped', statusType: 'info' },
                        { id: '#FV-8930-M', date: 'Jan 24, 2024', product: 'Prism-Optic Glasses v4', cat: 'Avatar Accessory', customer: 'Marcus Chen', status: 'Delivered', statusType: 'success' },
                        { id: '#FV-8911-W', date: 'Jan 23, 2024', product: 'Liquid Silk Gown #02', cat: 'Luxury Asset', customer: 'Sophie Laurent', status: 'Pending Sync', statusType: 'warning' },
                    ].map((order, idx) => (
                        <div className="list-row orders-list-grid" key={idx}>
                            <div className="order-id-cell">
                                <span className="order-id-main">{order.id}</span>
                                <span className="order-id-sub">{order.date}</span>
                            </div>
                            <div className="product-cell">
                                <div className="product-img-v"></div>
                                <div className="product-info-v">
                                    <span className="product-name-v">{order.product}</span>
                                    <span className="product-cat-v">{order.cat}</span>
                                </div>
                            </div>
                            <div className="customer-name-v" style={{ fontWeight: 500, color: '#334155' }}>
                                {order.customer}
                            </div>
                            <div>
                                <span className={`pill ${order.statusType}`}>{order.status}</span>
                            </div>
                            <div className="action-btns-v">
                                <button className="primary-btn" style={{ padding: '6px 12px', fontSize: '11px' }}>Update Status</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="pagination-v">
                    <span className="pagination-info-v">Showing 1-4 of 124 orders</span>
                    <div className="page-controls-v">
                        <button className="page-btn-v">‹</button>
                        <button className="page-btn-v active">1</button>
                        <button className="page-btn-v">2</button>
                        <button className="page-btn-v">3</button>
                        <button className="page-btn-v">›</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Orders;
