const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);

// PROTECTED (ONLY LOGGED IN USERS)
router.post("/create", authMiddleware, jobController.createJob);
router.put("/update/:id", authMiddleware, jobController.updateJob);
router.delete("/delete/:id", authMiddleware, jobController.deleteJob);

module.exports = router;