const db = require("../config/db");

const Job = {};

// CREATE JOB
Job.create = async (data) => {
  const {
    title,
    company,
    location,
    job_type,
    salary,
    description,
    requirements,
    recruiter_id,
  } = data;

  return db.query(
    `INSERT INTO jobs 
    (title, company, location, job_type, salary, description, requirements, recruiter_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      company,
      location,
      job_type,
      salary,
      description,
      requirements,
      recruiter_id,
    ]
  );
};

// GET ALL JOBS
Job.getAll = async () => {
  return db.query("SELECT * FROM jobs ORDER BY created_at DESC");
};

// GET JOB BY ID
Job.getById = async (id) => {
  return db.query("SELECT * FROM jobs WHERE id = ?", [id]);
};

// UPDATE JOB
Job.update = async (id, data) => {
  const {
    title,
    company,
    location,
    job_type,
    salary,
    description,
    requirements,
  } = data;

  return db.query(
    `UPDATE jobs SET 
    title=?, company=?, location=?, job_type=?, salary=?, description=?, requirements=?
    WHERE id=?`,
    [
      title,
      company,
      location,
      job_type,
      salary,
      description,
      requirements,
      id,
    ]
  );
};

// DELETE JOB
Job.remove = async (id) => {
  return db.query("DELETE FROM jobs WHERE id = ?", [id]);
};

module.exports = Job;