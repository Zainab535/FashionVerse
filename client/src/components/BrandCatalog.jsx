import React, { Component } from "react";
import { Link } from "react-router-dom";
import brand1 from "../assets/images/brand1.webp";
import brand2 from "../assets/images/brand2.jpg";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";

class BrandCatalog extends Component {
  constructor(props) {
    super(props);
    this.brands = [
      { id: "brand1", image: brand1 },
      { id: "brand2", image: brand2 },
      { id: "brand3", image: brand3 },
      { id: "brand4", image: brand4 },
      { id: "brand1", image: brand1 },
      { id: "brand2", image: brand2 },
      { id: "brand3", image: brand3 },
      { id: "brand4", image: brand4 },
    ];
    this.scrollRef = React.createRef();
  }

  scroll = (direction) => {
    const container = this.scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  render() {
    return (
      <section className="brand-section">
        <h2>Popular Brands</h2>

        <div className="brand-container">
          <button className="scroll-btn left" onClick={() => this.scroll("left")}>
            ‹
          </button>

          <div className="brand-scroll" ref={this.scrollRef}>
            {this.brands.map((b, i) => (
              <Link to={`/brand/${b.id}`} key={i} className="brand-card-link">
                <div className="brand-card">
                  <img src={b.image} alt="Brand" />
                  <div className="brand-overlay">
                    <button className="overlay-btn" onClick={(e) => e.preventDefault()}>2D Store</button>
                    <button className="overlay-btn dark" onClick={(e) => e.preventDefault()}>3D Store</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button className="scroll-btn right" onClick={() => this.scroll("right")}>
            ›
          </button>
        </div>
      </section>
    );
  }
}

export default BrandCatalog;
