import express from "express";
import { Project } from "../models/Project.js";

const router = express.Router();

// GET all projects (tenant-safe + role-safe)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({
      tenant_id: req.user.tenant_id,
    });

    const safeProjects = projects.map((p) => {
      const base = {
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        tenant_id: p.tenant_id,
      };

      // Only admin sees budget
      if (req.user.role === "admin") {
        return { ...base, budget: p.budget };
      }

      return base;
    });

    res.json(safeProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;