import React, { Component } from "react";
import brand1 from "../assets/images/brand1.webp";
import brand2 from "../assets/images/brand2.jpg";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";

class BrandCatalog extends Component {
  constructor(props) {
    super(props);
    this.brands = [brand1, brand2, brand3, brand4, brand1,brand2,brand3,brand4];
  }

  render() {
    return (
      <section className="brand-section">
        <h2>Popular Brands</h2>

        <div className="brand-scroll">
          {this.brands.map((b, i) => (
            <div className="brand-card" key={i}>
              <img src={b} alt="Brand" />
              <div className="brand-overlay">
                <button>2D Store</button>
                <button className="dark">3D Store</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default BrandCatalog;
