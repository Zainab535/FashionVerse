import { Component } from "react";
import "../styles/admin/AdminDashboard.css";

class StatCard extends Component {
  render() {
    const { icon, iconColor, label, value, change, changeType } = this.props;
    return (
      <div className="stat-card">
        <div className="stat-header">
          <div className="stat-label">{label}</div>
          <div className={`stat-icon ${iconColor}`}>
            <span className={`nav-icon ${icon}`}></span>
          </div>
        </div>
        <div className="stat-value">{value}</div>
        <div className={`stat-change ${changeType}`}>
          <span className="arrow">
            {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'}
          </span>
          <span>{change}</span>
          <span>vs last month</span>
        </div>
      </div>
    );
  }
}

class ActivityRow extends Component {
  render() {
    const { icon, iconColor, title, description, status, time } = this.props;
    return (
      <tr>
        <td>
          <div className="activity-event">
            <div className={`event-icon ${iconColor}`}>
              <span className={`activity-icon ${icon}`}></span>
            </div>
            <div className="event-info">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>
        </td>
        <td>
          <span className={`status-badge ${status.toLowerCase()}`}>
            {status}
          </span>
        </td>
        <td>
          <span className="time-text">{time}</span>
        </td>
      </tr>
    );
  }
}

class QuickAction extends Component {
  render() {
    const { icon, label, onClick } = this.props;
    return (
      <button className="action-btn" onClick={onClick}>
        <span className={`action-icon ${icon}`}></span>
        <span>{label}</span>
      </button>
    );
  }
}

class TaskItem extends Component {
  render() {
    const { icon, iconColor, title, description, actionText } = this.props;
    return (
      <div className="task-item">
        <div className="task-info">
          <div className={`task-icon ${iconColor}`}>
            <span className={`task-icon-span ${icon}`}></span>
          </div>
          <div className="task-details">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <button className="task-action">{actionText}</button>
      </div>
    );
  }
}

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [
        {
          icon: "icon-users",
          iconColor: "gray",
          label: "New Users",
          value: "2,543",
          change: "+8.2%",
          changeType: "positive"
        },
        {
          icon: "icon-store",
          iconColor: "gray",
          label: "Active Brands",
          value: "842",
          change: "+0.0%",
          changeType: "neutral"
        },
        {
          icon: "icon-products",
          iconColor: "gray",
          label: "Total Products",
          value: "12,847",
          change: "+15.3%",
          changeType: "positive"
        }
      ],
      recentActivities: [
        {
          icon: "icon-user",
          iconColor: "gray",
          title: "New User Registration",
          description: "Alex Chen joined the platform",
          status: "Completed",
          time: "2 mins ago"
        },
        {
          icon: "icon-shopping",
          iconColor: "gray",
          title: "New Order #8821",
          description: "Value: $245.00",
          status: "Processing",
          time: "15 mins ago"
        },
        {
          icon: "icon-alert",
          iconColor: "gray",
          title: "Brand Verification",
          description: "EcoWear submitted documents",
          status: "Pending",
          time: "1 hour ago"
        },
        {
          icon: "icon-package",
          iconColor: "gray",
          title: "Stock Update",
          description: "CyberStyle Fashion added 12 items",
          status: "Completed",
          time: "3 hours ago"
        }
      ],
      pendingTasks: [
        {
          icon: "icon-alert-warning",
          iconColor: "gray",
          title: "Brand Verifications",
          description: "3 new requests waiting",
          actionText: "Review"
        },
        {
          icon: "icon-alert-danger",
          iconColor: "gray",
          title: "Reported Items",
          description: "5 items flagged by users",
          actionText: "Review"
        }
      ]
    };
  }

  handleQuickAction = (action) => {
    console.log(`Quick action clicked: ${action}`);
    // Add your action handler logic here
  }

  render() {
    const { stats, recentActivities, pendingTasks } = this.state;

    return (
      <div className="dashboard-content">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>Welcome back, Administrator. Here is your daily overview.</p>
          </div>
          <div className="date-filter">
            <span className="date-icon icon-calendar"></span>
            <span>Last 30 Days</span>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="two-column-layout">
          {/* Recent Activity */}
          <div className="activity-card">
            <div className="card-header">
              <h2 className="card-title">Recent Activity</h2>
              <a href="#" className="view-all-btn">View All</a>
            </div>

            <table className="activity-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <ActivityRow key={index} {...activity} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div>
            {/* Pending Tasks */}
            <div className="tasks-card">
              <div className="card-header">
                <h2 className="card-title">Pending Tasks</h2>
              </div>

              {pendingTasks.map((task, index) => (
                <TaskItem key={index} {...task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminHome;
