const db = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

// Find user by ID
const findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, full_name, email, role, phone, profile_image, created_at FROM users WHERE id = ?",
    [id]
  );
  return rows;
};

// Create new user
const createUser = async (userData) => {
  const { full_name, email, password, role } = userData;

  const [result] = await db.query(
    `INSERT INTO users (full_name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [full_name, email, password, role]
  );

  return result;
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};