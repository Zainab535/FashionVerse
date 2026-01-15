import { Component } from "react";
import AdminLayout from "./AdminLayout";
import "../styles/admin/AdminUsers.css";

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { 
          id: 1, 
          name: "Eleanor Pena", 
          email: "eleanor.pena@example.com", 
          role: "Admin", 
          status: "Active", 
          lastLogin: "Oct 24, 2023\n10:45 AM",
          userId: "USR-0001",
          avatar: "EP"
        },
        { 
          id: 2, 
          name: "Leslie Alexander", 
          email: "leslie.alexander@example.com", 
          role: "Customer", 
          status: "Active", 
          lastLogin: "Oct 22, 2023\n09:15 PM",
          userId: "USR-0002",
          avatar: "LA"
        },
        { 
          id: 3, 
          name: "Michael Foster", 
          email: "michael.foster@example.com", 
          role: "Brand Owner", 
          status: "Pending", 
          lastLogin: "Oct 20, 2023\n08:30 AM",
          userId: "USR-7735",
          avatar: "MF"
        },
        { 
          id: 4, 
          name: "Dries Vincent", 
          email: "dries.vincent@example.com", 
          role: "Customer", 
          status: "Suspended", 
          lastLogin: "Sep 12, 2023\n06:12 PM",
          userId: "USR-1102",
          avatar: "DV"
        },
        { 
          id: 5, 
          name: "Lindsay Jones", 
          email: "lindsay.jones@example.com", 
          role: "Brand Owner", 
          status: "Active", 
          lastLogin: "Oct 25, 2023\n11:20 AM",
          userId: "USR-4567",
          avatar: "LJ"
        }
      ],
      searchQuery: "",
      activeFilter: "All Users",
      stats: {
        totalUsers: "12,402",
        activeNow: "1,240",
        newSignups: "86",
        suspended: "43"
      }
    };
  }

  handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to suspend this user?")) {
      this.setState(prevState => ({
        users: prevState.users.map(user => 
          user.id === userId ? { ...user, status: "Suspended" } : user
        )
      }));
    }
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  }

  handleFilterChange = (filter) => {
    this.setState({ activeFilter: filter });
  }

  getFilteredUsers = () => {
    const { users, searchQuery, activeFilter } = this.state;
    
    let filtered = users;
    
    // Apply status filter
    if (activeFilter === "Active") {
      filtered = filtered.filter(user => user.status === "Active");
    } else if (activeFilter === "Inactive") {
      filtered = filtered.filter(user => user.status !== "Active");
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }

  render() {
    const { searchQuery, activeFilter, stats } = this.state;
    const filteredUsers = this.getFilteredUsers();

    return (
      <AdminLayout breadcrumb={
        <>
          <span className="brand-link">FashionVerse Admin</span>
          <span className="separator">/</span>
          <span className="current">User Management</span>
        </>
      }>
        <div className="dashboard-content">
          {/* Header */}
          <div className="user-management-header">
            <div className="header-content">
              <div className="header-info">
                <h1>User Management</h1>
                <p>
                  Manage registered users, roles, and account statuses.
                </p>
              </div>
              <div className="header-actions">
                <button className="export-btn">
                  📥 Export CSV
                </button>
                <button className="add-user-btn">
                  + Add User
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="user-stats-grid">
            <div className="user-stat-card">
              <div className="stat-info">
                <div className="stat-label">Total Users</div>
                <div className="stat-value">{stats.totalUsers}</div>
                <div className="stat-change positive">
                  ↗ +2.5% this month
                </div>
              </div>
            </div>
            <div className="user-stat-card">
              <div className="stat-info">
                <div className="stat-label">Active Now</div>
                <div className="stat-value">{stats.activeNow}</div>
                <div className="stat-change neutral">
                  ~10% of total users
                </div>
              </div>
            </div>
            <div className="user-stat-card">
              <div className="stat-info">
                <div className="stat-label">New Signups</div>
                <div className="stat-value">{stats.newSignups}</div>
                <div className="stat-change positive">
                  ↗ +12 today
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="user-controls">
            <div className="filter-tabs">
              {["All Users", "Active", "Inactive"].map((filter) => (
                <button 
                  key={filter}
                  className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => this.handleFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="search-controls">
              <input 
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={this.handleSearch}
                className="search-input"
              />
              <button className="filter-btn">
                🔍 Filter
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: 'var(--md-on-surface-variant)' }}>
                      <div className="empty-state">
                        <div className="empty-state-icon">👥</div>
                        <div className="empty-state-text">No users found</div>
                        <div className="empty-state-subtext">
                          {searchQuery ? 'Try adjusting your search criteria' : 'No users match the selected filters'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar-circle">
                          {user.avatar}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                          <div className="user-id">{user.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`role-badge role-${user.role.toLowerCase().replace(' ', '-')}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <div className="last-login">
                        {user.lastLogin.split('\n').map((line, index) => (
                          <div key={index} className={index === 0 ? 'login-date' : 'login-time'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge-new status-${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit-btn" 
                          title="Edit User"
                          aria-label="Edit user"
                          onClick={() => console.log('Edit user:', user.id)}
                        >
                          ✏️
                        </button>
                        {user.status === "Pending" && (
                          <button 
                            className="action-btn approve-btn" 
                            title="Approve User"
                            aria-label="Approve user"
                            onClick={() => {
                              this.setState(prevState => ({
                                users: prevState.users.map(u => 
                                  u.id === user.id ? { ...u, status: "Active" } : u
                                )
                              }));
                            }}
                          >
                            ✓
                          </button>
                        )}
                        <button 
                          className="action-btn delete-btn" 
                          title={user.status === "Suspended" ? "Reactivate User" : "Suspend User"}
                          onClick={() => this.handleDelete(user.id)}
                          aria-label={user.status === "Suspended" ? "Reactivate user" : "Suspend user"}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
            
            <div className="table-footer">
              <div className="showing-text">
                Showing {filteredUsers.length} of {stats.totalUsers} users
              </div>
              <div className="pagination">
                <button className="page-btn" disabled>Prev</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">Next</button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default ManageUsers;