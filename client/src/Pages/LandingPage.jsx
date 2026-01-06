import React, { Component } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import "../styles/LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-container">
        <Navbar />
        <HeroSection />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
