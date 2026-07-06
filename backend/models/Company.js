const db = require("../config/db");

// CREATE COMPANY
const createCompany = async (data) => {
  const { name, description, website, location, recruiter_id } = data;

  return db.query(
    `INSERT INTO companies (name, description, website, location, recruiter_id)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, website, location, recruiter_id]
  );
};

// GET ALL COMPANIES
const getAllCompanies = async () => {
  return db.query("SELECT * FROM companies ORDER BY id DESC");
};

// GET COMPANY BY ID
const getCompanyById = async (id) => {
  return db.query("SELECT * FROM companies WHERE id = ?", [id]);
};

// UPDATE COMPANY
const updateCompany = async (id, data) => {
  const { name, description, website, location } = data;

  return db.query(
    `UPDATE companies SET 
     name=?, description=?, website=?, location=?
     WHERE id=?`,
    [name, description, website, location, id]
  );
};

// DELETE COMPANY
const deleteCompany = async (id) => {
  return db.query("DELETE FROM companies WHERE id = ?", [id]);
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};