// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/auth.css";


// const SignupPage = () => {
//   return (
//     <div className="auth-page">
//       <h2>Sign Up</h2>

//       <input type="text" placeholder="Full Name" />
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />

//       {/* ROLE SELECTION */}
//       <select>
//         <option value="">Select Role</option>
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//         <option value="brand">Brand</option>
//       </select>

//       <button>Create Account</button>

//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const handleSignup = () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    // 🔹 SAVE ROLE (frontend only)
    localStorage.setItem("role", role);

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="auth-bg">
      <div className="auth-page">
        <h2>Sign Up</h2>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="brand">Brand</option>
        </select>

        <button onClick={handleSignup}>Create Account</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
