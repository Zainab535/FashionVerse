import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/images/store-hero.jpg";

const StoreHero = () => {
  return (
    <section className="store-hero">
      <div className="hero-text">
        <span className="season">FALL / WINTER 2024</span>
        <h1>Future Wear</h1>
        <p>
          Experience fashion where minimal design meets immersive digital
          innovation. Discover curated collections from world-renowned designers.
        </p>
        <Link to="/home">
          <button>Shop Now</button>
        </Link>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Fashion Model" />
      </div>
    </section>
  );
};

export default StoreHero;
