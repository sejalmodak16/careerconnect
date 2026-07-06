const db = require("../config/db");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, full_name, email, role, plan FROM users"
    );

    res.json({ success: true, data: users });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL JOBS
exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await db.query("SELECT * FROM jobs");

    res.json({ success: true, data: jobs });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);

    res.json({ success: true, message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    await db.query("DELETE FROM jobs WHERE id = ?", [req.params.id]);

    res.json({ success: true, message: "Job deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PLATFORM STATS
exports.getStats = async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [jobs] = await db.query("SELECT COUNT(*) AS total FROM jobs");
    const [apps] = await db.query("SELECT COUNT(*) AS total FROM applications");

    res.json({
      success: true,
      data: {
        users: users[0].total,
        jobs: jobs[0].total,
        applications: apps[0].total,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};