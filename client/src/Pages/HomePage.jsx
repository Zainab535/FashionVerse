import React, { Component } from "react";
import StoreNavbar from "../components/StoreNavbar";
import StoreHero from "../components/StoreHero";
import BrandCatalog from "../components/BrandCatalog";
import ProductGrid from "../components/ProductGrid";
import ProductFooter from "../components/ProductFooter";
import RecommendationSection from "../components/RecommendationSection";
import api from "../api";
import "../styles/Home.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularProducts: [],
      loading: false
    };
  }

  componentDidMount() {
    this.fetchPopularProducts();
  }

  fetchPopularProducts = async () => {
    try {
      this.setState({ loading: true });
      const response = await api.get('/reviews/top-rated');
      this.setState({ popularProducts: response.data });
    } catch (error) {
      console.error('Error fetching top rated products:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { popularProducts, loading } = this.state;
    return (
      <>
        <StoreNavbar />
        <StoreHero />
        <BrandCatalog />
        <ProductGrid />

        <RecommendationSection
          products={popularProducts}
          loading={loading}
          title=" Popular & Top Rated"
        />
        <ProductFooter />
      </>
    );
  }
}

export default HomePage;