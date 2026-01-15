import { Component } from "react";
import AdminLayout from "./AdminLayout";
import "../styles/admin/AdminBrands.css";

class ManageBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingVerifications: [
        { 
          id: 1, 
          brandName: "Urban Threads", 
          owner: "Sarah Jenkins", 
          submissionDate: "Oct 24, 2023",
          documents: "View PDF",
          initials: "UT"
        },
        { 
          id: 2, 
          brandName: "Neo-Tokyo Styles", 
          owner: "Kenji Sato", 
          submissionDate: "Oct 23, 2023",
          documents: "View PDF",
          initials: "NS"
        },
        { 
          id: 3, 
          brandName: "EcoWear", 
          owner: "Maria Garcia", 
          submissionDate: "Oct 22, 2023",
          documents: "View PDF",
          initials: "EW"
        }
      ],
      storeCategories: [
        {
          name: "Digital Wearables",
          subcategories: 12,
          items: 442
        },
        {
          name: "Physical Apparel",
          subcategories: 8,
          items: 1204
        },
        {
          name: "Accessories & Gear",
          subcategories: 6,
          items: 326
        },
        {
          name: "Limited Editions",
          subcategories: 4,
          items: 56
        }
      ]
    };
  }

  handleApprove = (brandId) => {
    this.setState(prevState => ({
      pendingVerifications: prevState.pendingVerifications.filter(brand => brand.id !== brandId)
    }));
    alert("Brand approved successfully!");
  }

  handleReject = (brandId) => {
    if (window.confirm("Are you sure you want to reject this brand application?")) {
      this.setState(prevState => ({
        pendingVerifications: prevState.pendingVerifications.filter(brand => brand.id !== brandId)
      }));
    }
  }

  render() {
    const { pendingVerifications, storeCategories } = this.state;

    return (
      <AdminLayout breadcrumb={
        <>
          <span className="brand-link">FashionVerse Admin</span>
          <span className="separator">/</span>
          <span className="current">Brand & Store Management</span>
        </>
      }>
        <div className="dashboard-content">
          {/* Header */}
          <div className="brand-management-header">
            <div className="header-content">
              <div className="header-info">
                <h1>Brand & Store Management</h1>
                <p>
                  Manage verification requests, registered owners, store assets, and categories.
                </p>
              </div>
              <div className="header-actions">
                <button className="export-btn">
                  📊 Export Report
                </button>
                <button className="add-user-btn">
                  + Invite Brand
                </button>
              </div>
            </div>
          </div>

          {/* Pending Brand Verifications */}
          <div className="pending-verifications-section">
            <div className="section-header">
              <div className="section-title">
                <span className="section-icon">📋</span>
                <h2>Pending Brand Verifications</h2>
                <span className="new-badge">3 New</span>
              </div>
            </div>

            <div className="verifications-table-container">
              <table className="verifications-table">
                <thead>
                  <tr>
                    <th>Brand Name</th>
                    <th>Owner</th>
                    <th>Submission Date</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingVerifications.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--md-on-surface-variant)' }}>
                        <div className="empty-state">
                          <div className="empty-state-icon">📋</div>
                          <div className="empty-state-text">No pending verifications</div>
                          <div className="empty-state-subtext">All brand verification requests have been processed</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    pendingVerifications.map((brand) => (
                      <tr key={brand.id}>
                        <td>
                          <div className="brand-name-cell">
                            <div className="brand-initials">
                              {brand.initials}
                            </div>
                            <span className="brand-name">{brand.brandName}</span>
                          </div>
                        </td>
                        <td>
                          <span className="owner-name">{brand.owner}</span>
                        </td>
                        <td>
                          <span className="submission-date">{brand.submissionDate}</span>
                        </td>
                        <td>
                          <button className="view-pdf-btn" onClick={() => console.log('View PDF:', brand.id)}>
                            📄 {brand.documents}
                          </button>
                        </td>
                        <td>
                          <div className="verification-actions">
                            <button 
                              className="reject-btn"
                              onClick={() => this.handleReject(brand.id)}
                              title="Reject Brand"
                              aria-label="Reject brand"
                            >
                              ✕
                            </button>
                            <button 
                              className="approve-btn"
                              onClick={() => this.handleApprove(brand.id)}
                              title="Approve Brand"
                              aria-label="Approve brand"
                            >
                              ✓
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="brand-two-column">
            {/* Manage Brand Assets */}
            <div className="brand-assets-section">
              <div className="section-header-simple">
                <span className="section-icon">📁</span>
                <h2>Manage Brand Assets</h2>
              </div>
              
              <div className="asset-item">
                <div className="asset-label">Default Store Banner</div>
                <div className="upload-area">
                  <div className="upload-icon">☁️</div>
                  <div className="upload-text">
                    <span className="upload-main">Click to upload</span>
                    <span className="upload-sub">or drag and drop</span>
                  </div>
                  <div className="upload-formats">PNG, JPG up to 10MB</div>
                </div>
              </div>

              <div className="asset-item">
                <div className="upload-area">
                  <div className="upload-icon">☁️</div>
                  <div className="upload-text">
                    <span className="upload-main">Click to upload</span>
                    <span className="upload-sub">or drag and drop</span>
                  </div>
                  <div className="upload-formats">PNG, JPG up to 10MB (+920x400px)</div>
                </div>
              </div>
            </div>

            {/* Store Categories */}
            <div className="store-categories-section">
              <div className="section-header-with-add">
                <div className="section-title-with-icon">
                  <span className="section-icon">🏪</span>
                  <h2>Store Categories</h2>
                </div>
                <button className="add-new-btn">+ Add New</button>
              </div>
              
              <div className="categories-list">
                {storeCategories.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🏪</div>
                    <div className="empty-state-text">No categories</div>
                    <div className="empty-state-subtext">Add your first category to get started</div>
                  </div>
                ) : (
                  storeCategories.map((category, index) => (
                    <div key={index} className="category-item">
                      <div className="category-drag" aria-label="Drag to reorder">⋮⋮</div>
                      <div className="category-info">
                        <div className="category-name">{category.name}</div>
                        <div className="category-stats">
                          {category.subcategories} Sub-categories • {category.items.toLocaleString()} Items
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="view-all-categories">
                <a href="#" className="view-all-link">View all categories</a>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default ManageBrands;
