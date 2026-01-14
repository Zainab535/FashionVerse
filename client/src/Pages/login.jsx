import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import api from "../api";

const LoginPage = () => {
  const navigate = useNavigate();

  // 🔹 state for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 REAL LOGIN HANDLER
  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // 🔹 token & role save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // 🔹 role based redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "brandOwner") {
        navigate("/brand");
      } else {
        navigate("/home");
      }

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-page">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
