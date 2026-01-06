import React, { Component } from "react";
import heroImage from "../assets/images/store-hero.jpg";

class StoreHero extends Component {
  render() {
    return (
      <section
        className="store-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>

        <div className="store-hero-content">
          <span className="season-tag">FALL / WINTER 2024</span>

          <h1>
            FUTURE <br /> WEAR
          </h1>

          <p>
            Experience the new collection in immersive 3D. <br />
            Minimalist design meets digital innovation.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">SHOP THE EDIT →</button>
            <button className="secondary-btn">VIEW IN 3D</button>
          </div>
        </div>
      </section>
    );
  }
}

export default StoreHero;
