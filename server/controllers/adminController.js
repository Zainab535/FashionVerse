import User from "../models/User.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
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

// ADMIN DASHBOARD STATS
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBrandOwners = await User.countDocuments({ role: "brandOwner" });

    const totalBrands = await Brand.countDocuments();
    const pendingBrands = await Brand.countDocuments({ isApproved: false });

    // Added: Get Total Products
    const totalProducts = await Product.countDocuments();

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
