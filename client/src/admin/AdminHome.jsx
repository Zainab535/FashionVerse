const AdminHome = () => {
  return (
    <div>
      <h1>Welcome, Admin 👋</h1>
      <p>Here is a quick overview of the system.</p>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p>120</p>
        </div>

        <div style={styles.card}>
          <h3>Total Brands</h3>
          <p>15</p>
        </div>

        <div style={styles.card}>
          <h3>Pending Requests</h3>
          <p>4</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    background: "#e38d8dff",
    padding: "20px",
    borderRadius: "8px",
    width: "180px",
    textAlign: "center"
  }
};

export default AdminHome;
