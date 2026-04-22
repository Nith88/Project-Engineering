import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// GET all users (tenant-safe + role-safe)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ tenant_id: req.user.tenant_id });

    const safeUsers = users.map((u) => {
      if (req.user.role === "admin") {
        return {
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          role: u.role,
          salary: u.salary,
          tenant_id: u.tenant_id,
        };
      }

      if (req.user.role === "manager") {
        return {
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          role: u.role,
          tenant_id: u.tenant_id,
        };
      }

      // user role
      return {
        id: u.id,
        full_name: u.full_name,
        email: u.email,
      };
    });

    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;