const db = require("../config/db");

// ===================== GET PROFILE =====================
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user] = await db.query(
      "SELECT id, full_name, email, role, phone, profile_image FROM users WHERE id = ?",
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===================== UPDATE PROFILE =====================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, phone } = req.body;

    await db.query(
      "UPDATE users SET full_name = ?, phone = ? WHERE id = ?",
      [full_name, phone, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===================== UPLOAD RESUME =====================
exports.uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const resumeFile = req.file.filename;

    await db.query(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [resumeFile, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      file: resumeFile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===================== APPLY JOB =====================
exports.applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { job_id } = req.body;

    await db.query(
      "INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, 'applied')",
      [job_id, userId]
    );

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===================== GET APPLIED JOBS =====================
exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT a.id, a.status, j.title, j.company, j.location
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.user_id = ?`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};