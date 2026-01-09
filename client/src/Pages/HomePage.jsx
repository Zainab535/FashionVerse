import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import StoreHero from "../components/StoreHero";
import BrandCatalog from "../components/BrandCatalog";
import ProductGrid from "../components/ProductGrid";
import StoreFooter from "../components/StoreFooter";

import "../styles/Home.css";

class HomePage extends Component {
  render() {
    return (
      <>
        <StoreNavbar />
        <StoreHero />
        <BrandCatalog />
        <ProductGrid />
        <StoreFooter />
      </>
    );
  }
}

export default HomePage;
