import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        
        {/* TOP BAR */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={styles.menuBtn}
        >
          ☰
        </button>

        {children}
      </div>
    </div>
  );
};

const styles = {
 menuBtn: {
  fontSize: "24px",
  background: "none",
  border: "none",
  cursor: "pointer",
  marginBottom: "20px",
  color: "#fff" 
}

};

export default AdminLayout;
