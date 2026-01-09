import { Link } from "react-router-dom";

const AdminSidebar = ({ open }) => {
  return (
    <div
      style={{
        width: open ? "220px" : "0",
        overflow: "hidden",
        background: "#000",
        color: "#fff",
        transition: "0.3s",
        padding: open ? "20px" : "0"
      }}
    >
      <h3>Admin Panel</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/admin/users" style={styles.link}>Manage Users</Link></li>
        <li><Link to="/admin/brands" style={styles.link}>Manage Brands</Link></li>
      </ul>
    </div>
  );
};

const styles = {
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    padding: "10px 0"
  }
};

export default AdminSidebar;
