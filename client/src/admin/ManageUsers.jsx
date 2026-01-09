import AdminLayout from "./AdminLayout";

const ManageUsers = () => {
  // Dummy users (backend baad mein)
  const users = [
    { id: 1, name: "Ali Khan", email: "ali@gmail.com", role: "User" },
    { id: 2, name: "Sara Ahmed", email: "sara@gmail.com", role: "Brand" },
    { id: 3, name: "Admin", email: "admin@gmail.com", role: "Admin" }
  ];

  return (
    <AdminLayout>
      <h2>Manage Users</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button style={styles.deleteBtn}>Delete</button>
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
  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default ManageUsers;
