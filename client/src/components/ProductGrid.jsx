import React, { Component } from "react";
import { withRouter } from "../utils/withRouter";

import coat from "../assets/images/product-1-wool-coat.jpg";
import dress from "../assets/images/product-2-silk-dress.jpg";
import bag from "../assets/images/product-3-leather-tote.jpg";
import shoes from "../assets/images/product-4-puffer-jacket.jpg";

class ProductGrid extends Component {
  constructor(props) {
    super(props);

    this.products = [
  {
    id: 1,
    brand: "Maison Margiela",
    name: "Oversized Wool Coat",
    price: "$1,250",
    image: coat,                 // ✅ MAIN IMAGE
    images: [coat, coat, coat, coat], // ✅ GALLERY
  },
  {
    id: 2,
    brand: "Rick Owens",
    name: "Asymmetric Silk Dress",
    price: "$890",
    image: dress,
    images: [dress, dress, dress, dress],
  },
  {
    id: 3,
    brand: "Rick Owens",
    name: "Asymmetric Tote Bag",
    price: "$799",
    image: bag,
    images: [bag, bag, bag, bag],
  },
  {
    id: 4,
    brand: "Rick Owens",
    name: "Luxury Shoes",
    price: "$899",
    image: shoes,
    images: [shoes, shoes, shoes, shoes],
  },
];
  }

 handleProductClick = (product) => {
  this.props.navigate(`/product/${product.id}`, {
    state: { product },
  });
};


  render() {
    return (
      <section className="product-section">
        <h2>New Arrivals</h2>

        <div className="product-grid">
          {this.products.map((p) => (
  <div
    className="product-card"
    key={p.id}
    onClick={() => this.handleProductClick(p)}
  >
    <img src={p.image} alt={p.name} />
    <div className="product-card-content">
      <span>{p.brand}</span>
      <h4>{p.name}</h4>
      <p>{p.price}</p>
    </div>
  </div>
))}

        </div>
      </section>
    );
  }
}

/* 🔗 withRouter injects navigate into props */
export default withRouter(ProductGrid);
