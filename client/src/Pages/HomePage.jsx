import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import StoreHero from "../components/StoreHero";
import BrandCatalog from "../components/BrandCatalog";
import ProductGrid from "../components/ProductGrid";
import ProductFooter from "../components/ProductFooter";

import "../styles/Home.css";

class HomePage extends Component {
  render() {
    return (
      <>
        <StoreNavbar />
        <StoreHero />
        <BrandCatalog />
        <ProductGrid />
        <ProductFooter />

      </>
    );
  }
}

export default HomePage;

