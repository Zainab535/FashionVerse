import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Category from './models/Category.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Initialize default categories
const initializeDefaultCategories = async () => {
  try {
    // Initialization logic removed - categories are now created on demand by admin
    console.log('Category management ready - admins can add Women, Men, Kids anytime');
  } catch (error) {
    console.error('Error initializing categories:', error.message);
  }
};

// Initialize categories after DB connection
setTimeout(initializeDefaultCategories, 1000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/admin", adminRoutes);
// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
