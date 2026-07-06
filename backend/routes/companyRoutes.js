const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);

// PROTECTED ROUTES (Recruiter)
router.post("/create", authMiddleware, companyController.createCompany);
router.put("/update/:id", authMiddleware, companyController.updateCompany);
router.delete("/delete/:id", authMiddleware, companyController.deleteCompany);

module.exports = router;