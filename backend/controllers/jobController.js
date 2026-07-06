const db = require("../config/db");

/* ================= SAFE AI (NO CRASH VERSION) ================= */
let analyzeResume = async (resumeText, jobTitle, jobDescription) => {
  return {
    score: 0,
    summary: "AI disabled (safe mode)",
    strengths: [],
    weaknesses: [],
  };
};

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    const recruiter_id = req.user.id;

    const [user] = await db.query(
      "SELECT plan FROM users WHERE id = ?",
      [recruiter_id]
    );

    const plan = user[0]?.plan || "free";

    // FREE PLAN LIMIT
    if (plan === "free") {
      const [count] = await db.query(
        "SELECT COUNT(*) AS total FROM jobs WHERE recruiter_id = ?",
        [recruiter_id]
      );

      if (count[0].total >= 3) {
        return res.status(403).json({
          success: false,
          message: "Upgrade to PRO to post more jobs",
        });
      }
    }

    const {
      title,
      company,
      location,
      job_type,
      salary,
      description,
    } = req.body;

    await db.query(
      `INSERT INTO jobs 
      (title, company, location, job_type, salary, description, recruiter_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        company,
        location,
        job_type,
        salary,
        description,
        recruiter_id,
      ]
    );

    res.json({
      success: true,
      message: "Job created successfully",
      plan,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL JOBS ================= */
exports.getAllJobs = async (req, res) => {
  try {
    const [jobs] = await db.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    res.json({ success: true, data: jobs });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET JOB BY ID ================= */
exports.getJobById = async (req, res) => {
  try {
    const [job] = await db.query(
      "SELECT * FROM jobs WHERE id = ?",
      [req.params.id]
    );

    if (!job.length) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({ success: true, data: job[0] });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE JOB ================= */
exports.updateJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      job_type,
      salary,
      description,
    } = req.body;

    await db.query(
      `UPDATE jobs SET 
        title=?, company=?, location=?, job_type=?, salary=?, description=?
       WHERE id=?`,
      [
        title,
        company,
        location,
        job_type,
        salary,
        description,
        req.params.id,
      ]
    );

    res.json({
      success: true,
      message: "Job updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE JOB ================= */
exports.deleteJob = async (req, res) => {
  try {
    await db.query("DELETE FROM jobs WHERE id = ?", [req.params.id]);

    res.json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET APPLICANTS (AI SAFE RANKING) ================= */
exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const [jobData] = await db.query(
      "SELECT * FROM jobs WHERE id = ?",
      [jobId]
    );

    if (!jobData.length) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const job = jobData[0];

    const [applicants] = await db.query(
      `SELECT 
        a.id AS application_id,
        a.status,
        u.full_name,
        u.email,
        u.phone,
        u.skills
       FROM applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.job_id = ?`,
      [jobId]
    );

    const ranked = [];

    for (let a of applicants) {
      let aiResult;

      try {
        aiResult = await analyzeResume(
          a.skills || "",
          job.title,
          job.description
        );
      } catch (err) {
        aiResult = {
          score: 0,
          summary: "AI error",
          strengths: [],
          weaknesses: [],
        };
      }

      ranked.push({
        ...a,
        ai_score: aiResult.score || 0,
        ai_summary: aiResult.summary || "",
        strengths: aiResult.strengths || [],
        weaknesses: aiResult.weaknesses || [],
      });
    }

    ranked.sort((a, b) => b.ai_score - a.ai_score);

    res.json({
      success: true,
      data: ranked,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= RECOMMENDED JOBS ================= */
exports.getRecommendedJobs = async (req, res) => {
  try {
    const [jobs] = await db.query(
      "SELECT * FROM jobs ORDER BY created_at DESC LIMIT 10"
    );

    res.json({
      success: true,
      data: jobs,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};