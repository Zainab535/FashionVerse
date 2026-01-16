import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import api from "../api";
import "../styles/admin/AdminBrands.css";

const ManageBrands = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandForUpload, setSelectedBrandForUpload] = useState("");
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pendingRes, brandsRes, categoriesRes] = await Promise.all([
        api.get("/admin/verifications"),
        api.get("/admin/brands"),
        api.get("/admin/categories")
      ]);
      setPendingVerifications(pendingRes.data);
      setAllBrands(brandsRes.data);
      setStoreCategories(categoriesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (brandId) => {
    try {
      await api.put(`/admin/verifications/${brandId}/approve`);
      setPendingVerifications(pendingVerifications.filter(brand => brand._id !== brandId));
      fetchBrands(); // Refresh all brands
      alert("Brand approved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve brand");
    }
  };

  const handleReject = async (brandId) => {
    if (window.confirm("Are you sure you want to reject this brand application?")) {
      try {
        await api.put(`/admin/verifications/${brandId}/reject`);
        setPendingVerifications(pendingVerifications.filter(brand => brand._id !== brandId));
        alert("Brand rejected successfully!");
      } catch (err) {
        alert(err.response?.data?.message || "Failed to reject brand");
      }
    }
  };

  const handleViewDocuments = (brand) => {
    setSelectedBrand(brand);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBrand(null);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.heroImage.files[0];
    if (!file || !selectedBrandForUpload) {
      alert("Please select a brand and an image");
      return;
    }

    const formData = new FormData();
    formData.append('heroImage', file);
    formData.append('brandId', selectedBrandForUpload);

    try {
      setUploading(true);
      await api.post('/admin/brands/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Image uploaded successfully!");
      fetchData(); // Refresh all data
      setSelectedBrandForUpload("");
      e.target.reset();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      setAddingCategory(true);
      await api.post("/admin/categories", {
        name: newCategoryName,
        description: newCategoryDesc
      });
      alert("Category added successfully!");
      setNewCategoryName("");
      setNewCategoryDesc("");
      setShowCategoryForm(false);
      fetchData(); // Refresh categories
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add category");
    } finally {
      setAddingCategory(false);
    }
  };

  const handleQuickAddCategory = async (categoryName) => {
    try {
      setAddingCategory(true);
      await api.post("/admin/categories", {
        name: categoryName,
        description: `${categoryName}'s fashion collection`
      });
      alert(`${categoryName} category added successfully!`);
      fetchData(); // Refresh categories
    } catch (err) {
      alert(err.response?.data?.message || `Failed to add ${categoryName} category`);
    } finally {
      setAddingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/admin/categories/${categoryId}`);
        alert("Category deleted successfully!");
        fetchData(); // Refresh categories
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  if (loading) return <AdminLayout><div className="loading">Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="error">{error}</div></AdminLayout>;

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
                <span className="new-badge">{pendingVerifications.length} New</span>
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
                      <tr key={brand._id}>
                        <td>
                          <div className="brand-name-cell">
                            <div className="brand-initials">
                              {brand.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <span className="brand-name">{brand.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="owner-name">{brand.owner.name}</span>
                        </td>
                        <td>
                          <span className="submission-date">{new Date(brand.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td>
                        <button className="view-pdf-btn" onClick={() => handleViewDocuments(brand)}>
                            📄 View Documents
                          </button>
                        </td>
                        <td>
                          <div className="verification-actions">
                            <button 
                              className="reject-btn"
                              onClick={() => handleReject(brand._id)}
                              title="Reject Brand"
                              aria-label="Reject brand"
                            >
                              ✕
                            </button>
                            <button 
                              className="approve-btn"
                              onClick={() => handleApprove(brand._id)}
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
              
              <div className="upload-form-container">
                <form onSubmit={handleImageUpload} className="upload-form">
                  <div className="form-group">
                    <label htmlFor="brandSelect">Select Brand</label>
                    <select
                      id="brandSelect"
                      value={selectedBrandForUpload}
                      onChange={(e) => setSelectedBrandForUpload(e.target.value)}
                      required
                    >
                      <option value="">Choose a brand...</option>
                      {allBrands.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="heroImage">Hero Image</label>
                    <input
                      type="file"
                      id="heroImage"
                      name="heroImage"
                      accept="image/*"
                      required
                    />
                  </div>

                  <button type="submit" disabled={uploading} className="upload-btn">
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </form>
              </div>

              {/* Current Brand Images */}
              <div className="current-images">
                <h3>Current Hero Images</h3>
                <div className="images-grid">
                  {allBrands.filter(brand => brand.heroImage).map((brand) => (
                    <div key={brand._id} className="image-item">
                      <img 
                        src={`http://localhost:5000/uploads/brands/${brand.heroImage}`} 
                        alt={`${brand.name} hero`} 
                        className="brand-hero-preview"
                      />
                      <div className="image-info">
                        <strong>{brand.name}</strong>
                      </div>
                    </div>
                  ))}
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
                <button 
                  className="add-new-btn"
                  onClick={() => setShowCategoryForm(!showCategoryForm)}
                >
                  {showCategoryForm ? "✕ Cancel" : "+ Add New"}
                </button>
              </div>

              {/* Quick Add Default Categories */}
              <div className="quick-add-categories">
                <p className="quick-add-label">Quick Add:</p>
                <div className="quick-buttons">
                  {['Women', 'Men', 'Kids'].map((cat) => (
                    <button
                      key={cat}
                      className="quick-add-btn"
                      onClick={() => handleQuickAddCategory(cat)}
                      disabled={addingCategory || storeCategories.some(c => c.name === cat)}
                    >
                      + {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Category Form */}
              {showCategoryForm && (
                <form onSubmit={handleAddCategory} className="category-form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Description (optional)"
                      value={newCategoryDesc}
                      onChange={(e) => setNewCategoryDesc(e.target.value)}
                      rows="3"
                    />
                  </div>
                  <button type="submit" disabled={addingCategory} className="submit-btn">
                    {addingCategory ? "Adding..." : "Add Category"}
                  </button>
                </form>
              )}
              
              <div className="categories-list">
                {storeCategories.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">🏪</div>
                    <div className="empty-state-text">No categories</div>
                    <div className="empty-state-subtext">Add your first category to get started</div>
                  </div>
                ) : (
                  storeCategories.map((category) => (
                    <div key={category._id} className="category-item">
                      <div className="category-info">
                        <div className="category-header">
                          <div className="category-name">{category.name}</div>
                        </div>
                        <div className="category-description">{category.description}</div>
                      </div>
                      <button
                        className="delete-category-btn"
                        onClick={() => handleDeleteCategory(category._id)}
                        title="Delete category"
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Brand Documents Modal */}
        {modalOpen && selectedBrand && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Brand Documents - {selectedBrand.name}</h3>
                <button className="modal-close" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="brand-details">
                  <div className="detail-row">
                    <strong>Brand Name:</strong> {selectedBrand.name}
                  </div>
                  <div className="detail-row">
                    <strong>Owner:</strong> {selectedBrand.owner.name} ({selectedBrand.owner.email})
                  </div>
                  <div className="detail-row">
                    <strong>Submission Date:</strong> {new Date(selectedBrand.createdAt).toLocaleString()}
                  </div>
                  <div className="detail-row">
                    <strong>Status:</strong> {selectedBrand.isApproved ? 'Approved' : 'Pending'}
                  </div>
                </div>
                
                <div className="documents-section">
                  <h4>Submitted Documents</h4>
                  <div className="document-list">
                    <div className="document-item">
                      <span className="document-icon">📄</span>
                      <span className="document-name">Business License</span>
                      <button className="download-btn">Download</button>
                    </div>
                    <div className="document-item">
                      <span className="document-icon">📄</span>
                      <span className="document-name">Brand Registration</span>
                      <button className="download-btn">Download</button>
                    </div>
                    <div className="document-item">
                      <span className="document-icon">📄</span>
                      <span className="document-name">Tax Certificate</span>
                      <button className="download-btn">Download</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="modal-btn secondary" onClick={closeModal}>Close</button>
                {!selectedBrand.isApproved && (
                  <>
                    <button className="modal-btn danger" onClick={() => { closeModal(); handleReject(selectedBrand._id); }}>Reject</button>
                    <button className="modal-btn primary" onClick={() => { closeModal(); handleApprove(selectedBrand._id); }}>Approve</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </AdminLayout>
    );
};

export default ManageBrands;
