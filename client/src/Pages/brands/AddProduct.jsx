import React, { Component } from "react";
import "../../styles/brands/BrandDashboard.css";

class AddProduct extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                {/* HEADER */}
                <div className="subpage-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button className="icon-btn-v" onClick={this.props.onBack}>←</button>
                        <h1 style={{ fontSize: '20px' }}>Add New Product</h1>
                    </div>
                    <div className="dash-actions" style={{ alignItems: 'center' }}>
                        <button className="link-btn-v">Save Draft</button>
                        <button className="primary-btn" style={{ padding: '10px 24px' }}>Publish Product</button>
                    </div>
                </div>

                {/* STEPS INDICATOR */}
                <div className="steps-container-v">
                    {[
                        { n: 1, label: 'Basis Info' },
                        { n: 2, label: 'Pricing & Stock' },
                        { n: 3, label: 'Product Assets' },
                        { n: 4, label: 'Attributes' }
                    ].map((s) => (
                        <div className={`step-item-v ${s.n === 1 ? 'active' : ''}`} key={s.n}>
                            <div className="step-circle-v">{s.n}</div>
                            <span className="step-label-v">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* SECTION 1: BASIC INFO */}
                <div className="form-section">
                    <div className="section-title-v">
                        <span className="section-icon-v">❶</span> 1. Basic Information
                    </div>
                    <div className="form-grid-v">
                        <div className="form-group-v full-width">
                            <label className="label-v">Product Title</label>
                            <input type="text" className="input-v" placeholder="e.g. Neon-Void Puffer [Holo]" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">SKU</label>
                            <input type="text" className="input-v" placeholder="FV-XXXX-XXX" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Category</label>
                            <select className="select-v">
                                <option>e.g WOMENS</option>
                                <option>MENS</option>
                                <option>ACCESSORIES</option>
                            </select>
                        </div>
                        <div className="form-group-v full-width">
                            <label className="label-v">Description</label>
                            <textarea className="textarea-v" placeholder="Describe the material, fit, and digital features..."></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: PRICING & STOCK */}
                <div className="form-section">
                    <div className="section-title-v">
                        <span className="section-icon-v">❷</span> 2. Pricing & Stock
                    </div>
                    <div className="form-grid-v">
                        <div className="form-group-v">
                            <label className="label-v">Price (USD)</label>
                            <input type="text" className="input-v" placeholder="0.00" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Initial Inventory Level</label>
                            <input type="number" className="input-v" placeholder="0" />
                        </div>
                    </div>
                </div>

                {/* SECTION 3: PRODUCT ASSETS */}
                <div className="form-section">
                    <div className="section-title-v">
                        <span className="section-icon-v">❸</span> 3. Product Assets
                    </div>
                    <div className="form-group-v">
                        <label className="label-v">High-Res 2D Images</label>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <div className="upload-placeholder-v" style={{ flex: 1, padding: '30px' }}>
                                <span style={{ fontSize: '24px' }}>📄</span>
                                <div className="upload-text-v">
                                    <div className="upload-title-v">Click or drag images to upload</div>
                                    <div className="upload-hint-v">PNG, JPG up to 10MB</div>
                                </div>
                            </div>
                            <div className="product-img-v" style={{ width: '80px', height: '80px', borderRadius: '4px', background: '#f8fafc' }}></div>
                            <div className="product-img-v" style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#94a3b8' }}>+</div>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: ATTRIBUTES */}
                <div className="form-section">
                    <div className="section-title-v">
                        <span className="section-icon-v">❹</span> 4. Attributes
                    </div>
                    <div className="form-grid-v">
                        <div className="form-group-v">
                            <label className="label-v">Fabric/Material</label>
                            <input type="text" className="input-v" placeholder="e.g. Liquid Silk, Carbon Fiber" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Size Options</label>
                            <div className="variation-group-v">
                                {['XS', 'S', 'M', 'L', 'XL', 'One Size'].map(s => (
                                    <button className={`size-btn-v ${s === 'XS' ? 'active' : ''}`} key={s}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Primary Color</label>
                            <div className="color-picker-v">
                                <div className="color-preview-v" style={{ background: '#0ea5e9' }}></div>
                                <span style={{ fontSize: '12px', fontWeight: 600 }}>#1289a1</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="footer-actions-v" style={{ border: 'none' }}>
                    <button className="link-btn-v">Cancel</button>
                    <button className="primary-btn" style={{ padding: '12px 32px' }}>Publish Product to Store</button>
                </div>
            </div>
        );
    }
}

export default AddProduct;
