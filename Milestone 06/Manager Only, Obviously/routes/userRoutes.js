import express from 'express';

import {
  getAllUsers,
  updateUserRole,
  getUserProfile,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin only
router.get(
  '/',
  protect,
  requireRole('admin'),
  getAllUsers
);

router.put(
  '/:id/role',
  protect,
  requireRole('admin'),
  updateUserRole
);

// All authenticated users
router.get('/me', protect, getUserProfile);

export default router;