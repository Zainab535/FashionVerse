import axios from 'axios';

// Home page - Popular & Top Rated Products
export const getPopularProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5001/popular');
        return response.data;
    } catch (error) {
        console.error('Popular products error:', error.message);
        return [];
    }
};

// Product Detail Page - Related Products
export const getRelatedProducts = async (productId, category) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:5001/related/${productId}?category=${category}`
        );
        return response.data;
    } catch (error) {
        console.error('Related products error:', error.message);
        return [];
    }
};

// User based recommendations
export const getRecommendations = async (userId) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:5001/recommend/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error('Recommendation error:', error.message);
        return [];
    }
};