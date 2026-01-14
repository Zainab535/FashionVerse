import express from "express";
import { verifyToken } from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

import {
  getAllBrands,
  updateBrandStatus
} from "../controllers/brandController.js";

const router = express.Router();

// 👮 ADMIN ONLY
router.get("/", verifyToken, adminOnly, getAllBrands);
router.put("/:id/status", verifyToken, adminOnly, updateBrandStatus);

export default router;
