import { Component } from "react";
import AdminLayout from "./AdminLayout";
// import "../styles/admin/AdminProducts.css";

class ManageProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: "Classic White Sneakers",
          brand: "Nike",
          price: "$89.99",
          stock: 45,
          status: "Active",
          category: "Footwear"
        },
        {
          id: 2,
          name: "Denim Jacket",
          brand: "Zara",
          price: "$120.00",
          stock: 12,
          status: "Active",
          category: "Outerwear"
        },
        {
          id: 3,
          name: "Summer Dress",
          brand: "Local Brand",
          price: "$65.50",
          stock: 0,
          status: "Out of Stock",
          category: "Dresses"
        },
        {
          id: 4,
          name: "Leather Wallet",
          brand: "Adidas",
          price: "$45.00",
          stock: 89,
          status: "Active",
          category: "Accessories"
        }
      ],
      searchQuery: "",
      filterStatus: "All"
    };
  }

  handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      this.setState(prevState => ({
        products: prevState.products.filter(product => product.id !== productId)
      }));
    }
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  handleFilterChange = (e) => {
    this.setState({ filterStatus: e.target.value });
  }

  getFilteredProducts = () => {
    const { products, searchQuery, filterStatus } = this.state;

    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "All") {
      filtered = filtered.filter(product => product.status === filterStatus);
    }

    return filtered;
  }

  render() {
    const { searchQuery, filterStatus } = this.state;
    const filteredProducts = this.getFilteredProducts();

    return (
      <AdminLayout>
        <div className="dashboard-content">
          {/* Header */}
          <div className="product-management-header">
            <div className="header-content">
              <div className="header-info">
                <h1>Manage Products</h1>
                <p>View and manage all products in the store</p>
              </div>
            </div>
          </div>

          <div className="activity-card">
            <div className="card-header">
              <h2 className="card-title">All Products ({filteredProducts.length})</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select
                  value={filterStatus}
                  onChange={this.handleFilterChange}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={this.handleSearch}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    width: '250px'
                  }}
                />
              </div>
            </div>

            <table className="activity-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="activity-event">
                        <div className="event-icon green">
                          <span>📦</span>
                        </div>
                        <div className="event-info">
                          <h4>{product.name}</h4>
                          <p>{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="time-text">{product.brand}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>
                        {product.price}
                      </span>
                    </td>
                    <td>
                      <span className={product.stock === 0 ? 'time-text' : ''}>
                        {product.stock} units
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${product.status === 'Active' ? 'completed' : 'pending'
                        }`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="task-action"
                          style={{ background: '#eef2ff', color: '#667eea', borderColor: '#667eea' }}
                        >
                          Edit
                        </button>
                        <button
                          className="task-action"
                          onClick={() => this.handleDelete(product.id)}
                          style={{ background: '#fee2e2', color: '#dc2626' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default ManageProducts;
