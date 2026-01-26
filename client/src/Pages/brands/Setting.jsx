import React, { Component } from "react";
import "../../styles/brands/BrandDashboard.css";

class Setting extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                {/* HEADER */}
                <div className="subpage-header">
                    <h1>Store Settings</h1>
                </div>

                {/* TABS */}
                <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #f1f5f9', marginBottom: '32px' }}>
                    <button className="tab-btn active" style={{ borderRadius: 0, padding: '12px 4px', borderBottom: '2px solid #0ea5e9' }}>Store Profile</button>
                    <button className="tab-btn" style={{ borderRadius: 0, padding: '12px 4px' }}>Account Security</button>
                    <button className="tab-btn" style={{ borderRadius: 0, padding: '12px 4px' }}>Notifications</button>
                </div>

                {/* SECTION: STORE BRANDING */}
                <div className="form-section">
                    <div className="section-title-v">Store Branding</div>
                    <div className="branding-grid-v">
                        <div className="form-group-v">
                            <label className="label-v">Store Logo</label>
                            <div className="logo-uploader-v">
                                <div className="edit-btn-v">✎</div>
                            </div>
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Store Banner</label>
                            <div className="banner-uploader-v">
                                <span style={{ fontSize: '24px', opacity: 0.3 }}>🖼</span>
                                <button className="change-banner-btn-v">
                                    <span>⬆</span> Change Banner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION: GENERAL INFO */}
                <div className="form-section">
                    <div className="section-title-v">General Information</div>
                    <div className="form-grid-v">
                        <div className="form-group-v">
                            <label className="label-v">Store Name</label>
                            <input type="text" className="input-v" defaultValue="Alexander McQueen Digital" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Store URL</label>
                            <div style={{ display: 'flex' }}>
                                <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px 0 0 6px', fontSize: '11px', color: '#94a3b8' }}>fashionverse.io/</div>
                                <input type="text" className="input-v" defaultValue="mcqueen-digital" style={{ borderRadius: '0 6px 6px 0' }} />
                            </div>
                        </div>
                        <div className="form-group-v full-width">
                            <label className="label-v">Store Description</label>
                            <textarea className="textarea-v" defaultValue="A visionary exploration of luxury 3D fashion assets. Pushing the boundaries of digital ownership and avatar high-culture."></textarea>
                        </div>
                    </div>
                </div>

                {/* SECTION: CONTACT & SUPPORT */}
                <div className="form-section">
                    <div className="section-title-v">Contact & Support</div>
                    <div className="form-grid-v">
                        <div className="form-group-v">
                            <label className="label-v">Support Email</label>
                            <input type="email" className="input-v" defaultValue="support@mcqueen-digital.com" />
                        </div>
                        <div className="form-group-v">
                            <label className="label-v">Business Phone</label>
                            <input type="text" className="input-v" defaultValue="+44 20 7355 0088" />
                        </div>
                    </div>
                </div>

                {/* SECTION: QUICK NOTIFICATIONS */}
                <div className="form-section">
                    <div className="section-title-v">Quick Notifications</div>
                    <div className="toggle-item-v">
                        <div className="toggle-info-v">
                            <h4>Order Placement</h4>
                            <p>Receive instant alerts when a new order is received.</p>
                        </div>
                        <label className="switch-v">
                            <input type="checkbox" defaultChecked />
                            <span className="slider-v"></span>
                        </label>
                    </div>
                    <div className="toggle-item-v" style={{ borderTop: '1px solid #f1f5f9', marginTop: '10px', paddingTop: '10px' }}>
                        <div className="toggle-info-v">
                            <h4>Inventory Alerts</h4>
                            <p>Get notified when stock levels for any 3D asset drop below 5 units.</p>
                        </div>
                        <label className="switch-v">
                            <input type="checkbox" />
                            <span className="slider-v"></span>
                        </label>
                    </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="footer-actions-v" style={{ border: 'none' }}>
                    <button className="link-btn-v">Discard Changes</button>
                    <button className="primary-btn" style={{ padding: '12px 32px' }}>Save Changes</button>
                </div>
            </div>
        );
    }
}

export default Setting;
