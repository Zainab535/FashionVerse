import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
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
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">FashionVerse</div>
        <img 
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop" 
          alt="Fashion Model" 
          className="login-model-image"
        />
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Access your curated collection and exclusive pieces.</p>

          <div className="login-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="login-form-group">
            <div className="login-label-row">
              <label>Password</label>
              <Link to="/forgot-password" className="login-forgot">Forgot?</Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>

          <button onClick={handleLogin} className="login-button">
            Login
          </button>

          <p className="login-signup-text">
            New to FashionVerse? <Link to="/signin" className="login-signup-link">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
