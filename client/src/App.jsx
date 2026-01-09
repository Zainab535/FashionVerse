import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/login";
import SignupPage from "./Pages/signin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageBrands from "./admin/ManageBrands";
import ManageUsers from "./admin/ManageUsers";


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/brands" element={<ManageBrands />} />
          

        </Routes>
      </Router>
    );
  }
}

export default App;
