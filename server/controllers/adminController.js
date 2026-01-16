import User from "../models/User.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/Category.js";
import multer from "multer";
import path from "path";

// Multer configuration for brand images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/brands/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'brand-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const { search, filter, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Apply search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { _id: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply status filter
    if (filter === 'active') {
      query.role = { $ne: 'suspended' };
    } else if (filter === 'inactive') {
      query.role = 'suspended';
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER ROLE
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      message: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN DASHBOARD STATS
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBrandOwners = await User.countDocuments({ role: "brandOwner" });

    const totalBrands = await Brand.countDocuments();
    const pendingBrands = await Brand.countDocuments({ isApproved: false });

    // Added: Get Total Products
    const totalProducts = await Product.countDocuments();

    // Added: Get Total Orders
    const totalOrders = await Order.countDocuments();

    // Added: Get Recent Activities (last 5 users)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    const recentActivities = recentUsers.map(user => ({
      icon: "icon-users",
      iconColor: "blue",
      title: "New User Registration",
      description: `${user.name} joined the platform`,
      status: "Completed",
      time: new Date(user.createdAt).toLocaleDateString()
    }));

    res.json({
      totalUsers,
      totalBrandOwners,
      totalBrands,
      pendingBrands,
      totalProducts,
      totalOrders,
      recentActivities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SETTINGS
export const getSettings = async (req, res) => {
  try {
    // For now, return default settings. Later, can use a Settings model.
    const settings = {
      storeProfile: {
        storeName: "FashionVerse",
        supportEmail: "support@fashionverse.com"
      },
      securitySettings: {
        twoFactorAuth: false
      }
    };
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SETTINGS
export const updateSettings = async (req, res) => {
  try {
    const { storeProfile, securitySettings } = req.body;
    // For now, just return success. In real app, save to DB.
    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BRANDS
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
      .populate("owner", "name email role");

    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BRAND STATUS (APPROVE/REJECT)
export const updateBrandStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;

    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.isApproved = isApproved;
    await brand.save();

    res.json({
      message: `Brand ${isApproved ? "approved" : "rejected"} successfully`,
      brand
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BRAND
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await Brand.findByIdAndDelete(req.params.id);

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PENDING VERIFICATIONS (PENDING BRANDS)
export const getPendingVerifications = async (req, res) => {
  try {
    const pendingBrands = await Brand.find({ isApproved: false })
      .populate("owner", "name email role");

    res.json(pendingBrands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE VERIFICATION
export const approveVerification = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.isApproved = true;
    await brand.save();

    res.json({
      message: "Brand verified successfully",
      brand
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT VERIFICATION
export const rejectVerification = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.isApproved = false;
    await brand.save();

    res.json({
      message: "Brand verification rejected",
      brand
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPLOAD BRAND HERO IMAGE
export const uploadBrandImage = async (req, res) => {
  try {
    const { brandId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Delete old image if exists
    if (brand.heroImage) {
      const fs = await import('fs');
      const path = await import('path');
      const oldImagePath = path.join('uploads/brands/', path.basename(brand.heroImage));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    brand.heroImage = req.file.filename;
    await brand.save();

    res.json({
      message: "Brand hero image uploaded successfully",
      brand,
      imageUrl: `/uploads/brands/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========== CATEGORY MANAGEMENT ==========

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: { $regex: name, $options: 'i' } });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name: name.trim(),
      description: description || ""
    });

    await category.save();
    res.status(201).json({
      message: "Category created successfully",
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name || category.name;
    category.description = description !== undefined ? description : category.description;
    await category.save();

    res.json({
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========== PRODUCT MANAGEMENT ==========

// GET ALL PRODUCTS (Admin)
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Apply search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Apply status filter
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    const products = await Product.find(query)
      .populate('brand', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE PRODUCT (Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, images, isActive } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const product = new Product({
      name: name.trim(),
      description: description || "",
      price: parseFloat(price),
      category,
      brand,
      stock: parseInt(stock) || 0,
      images: images || [],
      isActive: isActive !== undefined ? isActive : true
    });

    await product.save();
    await product.populate('brand', 'name');

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, images, isActive } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    if (name !== undefined) product.name = name.trim();
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = parseInt(stock);
    if (images !== undefined) product.images = images;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();
    await product.populate('brand', 'name');

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TOGGLE PRODUCT STATUS (Admin)
export const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = !product.isActive;
    await product.save();
    await product.populate('brand', 'name');

    res.json({
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload };

