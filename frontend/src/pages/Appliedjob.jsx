import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // FETCH JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container">
      <h2>🔥 Latest Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h3>{job.title}</h3>

          <p>
            {job.company} • {job.location}
          </p>

          <p>
            <b>Type:</b> {job.job_type}
          </p>

          <p>
            <b>Salary:</b> {job.salary}
          </p>

          <button onClick={() => navigate(`/jobs/${job.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default Jobs;