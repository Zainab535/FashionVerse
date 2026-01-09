// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/auth.css";

// const LoginPage = () => {
//   const navigate = useNavigate(); // 🔹 yahan navigate banaya

//   // 🔹 LOGIN HANDLER (yahin add hota hai)
//   const handleLogin = () => {
//     // abhi demo ke liye hardcoded
//     const role = "admin"; // user / admin / brand

//     if (role === "admin") {
//       navigate("/admin");
//     } else {
//       navigate("/home");
//     }
//   };

//   return (
//     <div className="auth-bg">
//       <div className="auth-page">
//         <h2>Login</h2>

//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />

//         {/* 🔹 button par handler lagaya */}
//         <button onClick={handleLogin}>Login</button>

//         <p>
//           Don’t have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = localStorage.getItem("role");

    if (!role) {
      alert("No account found. Please sign up first.");
      return;
    }

    // 🔹 ROLE BASED REDIRECT
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "brand") {
      navigate("/brand");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-page">
        <h2>Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
