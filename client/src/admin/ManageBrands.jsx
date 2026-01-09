import AdminLayout from "./AdminLayout";

const ManageBrands = () => {
  // Dummy brands (backend baad mein)
  const brands = [
    { id: 1, name: "Zara", email: "zara@brand.com", status: "Pending" },
    { id: 2, name: "Nike", email: "nike@brand.com", status: "Pending" },
    { id: 3, name: "Local Brand", email: "local@brand.com", status: "Approved" }
  ];

  return (
    <AdminLayout>
      <h2>Manage Brands</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              <td>{brand.email}</td>
              <td>{brand.status}</td>
              <td>
                {brand.status === "Pending" ? (
                  <>
                    <button style={styles.approveBtn}>Approve</button>
                    <button style={styles.rejectBtn}>Reject</button>
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  },
  approveBtn: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    marginRight: "6px",
    cursor: "pointer"
  },
  rejectBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default ManageBrands;
