import express from "express";
import { verifyToken } from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";


import {
  getAllUsers,
  updateUserRole,
  getAdminStats,
  getSettings,
  updateSettings
} from "../controllers/adminController.js";

const router = express.Router();

// 👤 USERS MANAGEMENT
router.get("/users", verifyToken, adminOnly, getAllUsers);
router.put("/users/:id/role", verifyToken, adminOnly, updateUserRole);

// 📊 DASHBOARD STATS
router.get("/stats", verifyToken, adminOnly, getAdminStats);

// ⚙️ SETTINGS
router.get("/settings", verifyToken, adminOnly, getSettings);
router.put("/settings", verifyToken, adminOnly, updateSettings);

export default router;
