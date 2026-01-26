import React, { Component } from "react";
import "../../styles/brands/BrandDashboard.css";

class Inventory extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                {/* STATS ROW */}
                <div className="dash-stats">
                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Total Products</span>
                        </div>
                        <h2 className="stat-value">842</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '14px' }}>📁</span>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Active Catalog</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Low Stock</span>
                        </div>
                        <h2 className="stat-value">18</h2>
                        <span className="pill warning">⚠ Action Required</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Out of Stock</span>
                        </div>
                        <h2 className="stat-value">4</h2>
                        <span className="pill urgent">● Critical</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Categories</span>
                        </div>
                        <h2 className="stat-value">12</h2>
                        <span className="pill info">Diverse Range</span>
                    </div>
                </div>

                {/* FILTER BAR */}
                <div className="filter-bar">
                    <div className="tabs-group">
                        <button className="pill-tab active">All Products</button>
                        <button className="pill-tab">Wearables</button>
                        <button className="pill-tab">Accessories</button>
                        <button className="pill-tab">Footwear</button>
                    </div>
                    <div className="secondary-actions">
                        <span style={{ fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>
                            <span style={{ marginRight: '5px' }}>≡</span> Advanced Filters
                        </span>
                    </div>
                </div>

                {/* LIST SECTION */}
                <div className="list-container">
                    <div className="list-header inventory-list-grid">
                        <div>Image</div>
                        <div style={{ marginLeft: '10px' }}>SKU</div>
                        <div>Product Name</div>
                        <div>Category</div>
                        <div style={{ textAlign: 'center' }}>Stock Level</div>
                        <div>Price</div>
                        <div style={{ textAlign: 'right' }}>Actions</div>
                    </div>

                    {/* INVENTORY ITEMS */}
                    {[
                        { id: 1, sku: 'FV-CRG1-SLV', name: 'CyberRunner Gen.1 (Silver)', cat: 'Footwear', stock: 42, stockType: 'high', price: '$240.00' },
                        { id: 2, sku: 'FV-NVPH-001', name: 'Neon-Void Puffer [Holo]', cat: 'Wearables', stock: 8, stockType: 'low', price: '$1,200.00' },
                        { id: 3, sku: 'FV-POGV-400', name: 'Prism-Optic Glasses v4', cat: 'Accessories', stock: 124, stockType: 'high', price: '$85.00' },
                        { id: 4, sku: 'FV-LSG2-WHT', name: 'Liquid Silk Gown #02', cat: 'Wearables', stock: 0, stockType: 'none', price: '$3,500.00' },
                    ].map((item) => (
                        <div className="list-row inventory-list-grid" key={item.id}>
                            <div className="product-img-v"></div>
                            <div className="sku-cell" style={{ fontWeight: 600, color: '#334155', fontSize: '12px' }}>
                                {item.sku}
                            </div>
                            <div className="product-info-v">
                                <span className="product-name-v">{item.name}</span>
                                <span className="product-cat-v">3D Digital Ownership</span>
                            </div>
                            <div>
                                <span className="cat-badge-v">{item.cat}</span>
                            </div>
                            <div className="stock-lvl-cell">
                                <span className="stock-num">{item.stock}</span>
                                <div className="stock-bar-v">
                                    <div className={`fill ${item.stockType}`} style={{ width: item.stock > 0 ? '70%' : '0%' }}></div>
                                </div>
                            </div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>
                                {item.price}
                            </div>
                            <div className="action-btns-v">
                                <button className="icon-btn-v">✎</button>
                                <button className="icon-btn-v">🗑</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="pagination-v">
                    <span className="pagination-info-v">Showing 1-4 of 842 products</span>
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

export default Inventory;
