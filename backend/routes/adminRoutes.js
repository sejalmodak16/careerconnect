const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// (optional: add role check later)
router.get("/users", authMiddleware, adminController.getAllUsers);
router.get("/jobs", authMiddleware, adminController.getAllJobs);
router.delete("/user/:id", authMiddleware, adminController.deleteUser);
router.delete("/job/:id", authMiddleware, adminController.deleteJob);
router.get("/stats", authMiddleware, adminController.getStats);

module.exports = router;