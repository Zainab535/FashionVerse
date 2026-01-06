import React, { Component } from "react";
import splashImage from "../assets/images/fashion-model-splash.jpg";
import arrowIcon from "../assets/icons/arrow-forward.svg";

class HeroSection extends Component {
  render() {
    return (
      <section
        className="hero"
        style={{ backgroundImage: `url(${splashImage})` }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <p className="season">AUTUMN / WINTER 2024</p>

          <h1 className="title">FASHIONVERSE</h1>

          <p className="subtitle">
            Redefining Digital Couture.
            <br />
            Experience luxury in three dimensions.
          </p>

          <button className="enter-btn">
            ENTER STORE
            <img src={arrowIcon} alt="arrow" />
          </button>
        </div>
      </section>
    );
  }
}

export default HeroSection;
