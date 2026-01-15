import { Component } from "react";
import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../styles/admin/AdminLayout.css";

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      isMobile: window.innerWidth <= 768,
      dropdownOpen: false
    };
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ dropdownOpen: false });
    }
  }

  handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    this.setState({ 
      isMobile,
      sidebarOpen: !isMobile // Auto-close on mobile, open on desktop
    });
  }

  toggleSidebar = () => {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  }

  closeSidebar = () => {
    if (this.state.isMobile) {
      this.setState({ sidebarOpen: false });
    }
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  }

  handleChangePassword = () => {
    // Add change password logic here
    console.log('Change password clicked');
  }

  handleEditProfile = () => {
    // Add edit profile logic here
    console.log('Edit profile clicked');
  }

  render() {
    const { children, breadcrumb } = this.props;
    const { sidebarOpen, isMobile, dropdownOpen } = this.state;
    
    // Default breadcrumb if not provided
    const defaultBreadcrumb = (
      <>
        <span className="brand-link">FashionVerse Admin</span>
        <span className="separator">/</span>
        <span className="current">Dashboard Overview</span>
      </>
    );

    return (
      <div className="admin-layout">
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div className="mobile-overlay" onClick={this.closeSidebar} />
        )}
        
        {/* Professional Sidebar */}
        <div className={`admin-sidebar-container ${
          sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'
        } ${isMobile ? 'mobile-sidebar' : ''}`}>
          <AdminSidebar 
            isOpen={sidebarOpen}
            isMobile={isMobile}
            onNavigate={this.closeSidebar}
          />
        </div>

        {/* Main Content Area */}
        <div className={`admin-content ${
          sidebarOpen && !isMobile ? 'content-with-sidebar' : 'content-full'
        }`}>
          {/* Header */}
          <div className="admin-header">
            <div className="header-left">
              <button 
                className="menu-toggle" 
                onClick={this.toggleSidebar}
                aria-label="Toggle menu"
              >
                <span style={{ fontSize: '24px' }}>☰</span>
              </button>
              <div className="breadcrumb">
                {breadcrumb || defaultBreadcrumb}
              </div>
            </div>

            <div className="header-right">
              <button className="icon-btn notification-btn" title="Notifications" aria-label="Notifications">
                <span className="icon" style={{ fontSize: '20px' }}>🔔</span>
                <span className="badge">5</span>
              </button>

              <div className="user-menu" ref={this.dropdownRef}>
                <div className="user-avatar-container" onClick={this.toggleDropdown}>
                  <div className="user-avatar">JD</div>
                  <div className="user-info">
                    <div className="user-name">John Doe</div>
                    <div className="user-role">System Administrator</div>
                  </div>
                  <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
                </div>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={this.handleEditProfile}>
                      <span className="dropdown-icon">👤</span>
                      <span>Edit Profile</span>
                    </button>
                    <button className="dropdown-item" onClick={this.handleChangePassword}>
                      <span className="dropdown-icon">🔒</span>
                      <span>Change Password</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={this.handleLogout}>
                      <span className="dropdown-icon">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    );
  }
}

export default AdminLayout;
