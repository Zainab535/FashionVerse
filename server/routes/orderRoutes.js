import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getUserOrders);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id/status', verifyToken, verifyAdmin, updateOrderStatus);
router.put('/:id/cancel', verifyToken, cancelOrder);

export default router;
