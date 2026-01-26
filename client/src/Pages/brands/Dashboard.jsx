import React, { Component } from "react";

// Import icons
import calendarIcon from "../../assets/icons/calendar_month.png";

class Dashboard extends Component {
    render() {
        return (
            <div className="dash-wrapper">

                {/* HEADER */}
                <div className="dash-header">
                    <div>
                        <h1>Aesthetic Studio</h1>
                        <p>Performance report for the current fiscal month.</p>
                    </div>

                    <div className="dash-actions">
                        <button className="ghost-btn">
                            <img src={calendarIcon} alt="Calendar" className="btn-icon" /> Last 30 Days
                        </button>
                        <button className="primary-btn">↓ Export</button>
                    </div>
                </div>

                {/* STATS */}
                <div className="dash-stats">

                    {/* Total Sales */}
                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Total Sales</span>
                            <span className="pill success">+12.4%</span>
                        </div>
                        <h2 className="stat-value">$45,200.00</h2>
                        <div className="stat-bar">
                            <div className="fill"></div>
                        </div>
                    </div>

                    {/* Active Assets */}
                    <div className="stat-card">
                        <span className="stat-label">Active Assets</span>
                        <h2 className="stat-value">124<span className="stat-sub">/150 Limit</span></h2>
                        <div className="asset-bars">
                            <span className="bar-block on"></span>
                            <span className="bar-block on"></span>
                            <span className="bar-block on"></span>
                            <span className="bar-block on"></span>
                            <span className="bar-block"></span>
                        </div>
                    </div>

                    {/* Processing */}
                    <div className="stat-card">
                        <span className="stat-label">3 Processing</span>
                        <div className="processing-dots">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>

                    {/* Open Orders */}
                    <div className="stat-card">
                        <div className="stat-top">
                            <span className="stat-label">Open Orders</span>
                            <span className="pill urgent">4 Urgent</span>
                        </div>
                        <h2 className="stat-value">18</h2>
                        <a className="link">Review pending shipments →</a>
                    </div>

                </div>

                {/* LOWER GRID */}
                <div className="dash-grid">

                    {/* RECENT ACTIVITY */}
                    <div className="card">
                        <div className="card-head">
                            <h3>Recent Activity</h3>
                            <a className="link">View All</a>
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
                                <tr>
                                    <td className="order-id">#FV-2<br />984</td>
                                    <td>Alex<br />Rivera</td>
                                    <td><span className="status-dot live"></span> Live</td>
                                    <td>$249<br />.00</td>
                                </tr>
                                <tr>
                                    <td className="order-id">#FV-2<br />983</td>
                                    <td>Jordan<br />Smith</td>
                                    <td><span className="status-dot processing"></span> Processing</td>
                                    <td>$1,120<br />.00</td>
                                </tr>
                                <tr>
                                    <td className="order-id">#FV-2<br />982</td>
                                    <td>Mila<br />K.</td>
                                    <td><span className="status-dot live"></span> Live</td>
                                    <td>$85<br />.50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* TOP SELLERS */}
                    <div className="card">
                        <div className="card-head">
                            <h3>Top Sellers</h3>
                            <span className="muted">7 Days</span>
                        </div>

                        <div className="seller">
                            <div className="avatar"></div>
                            <div className="seller-info">
                                <strong>Neon Pulse Jacket</strong>
                                <p>34 sales this week</p>
                            </div>
                            <span className="seller-price">$145</span>
                        </div>

                        <div className="seller">
                            <div className="avatar"></div>
                            <div className="seller-info">
                                <strong>Aero Glide Sneakers</strong>
                                <p>28 sales this week</p>
                            </div>
                            <span className="seller-price">$210</span>
                        </div>

                        <div className="seller">
                            <div className="avatar"></div>
                            <div className="seller-info">
                                <strong>Chronos Digital V1</strong>
                                <p>19 sales this week</p>
                            </div>
                            <span className="seller-price">$89</span>
                        </div>

                        <a className="link center">See All Performance Metrics</a>
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;
