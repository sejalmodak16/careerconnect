import { useEffect, useState } from "react";
import API from "../api/api";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, jobsRes] = await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/users"),
          API.get("/admin/jobs"),
        ]);

        setStats(statsRes.data.data);
        setUsers(usersRes.data.data);
        setJobs(jobsRes.data.data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const deleteJob = async (id) => {
    await API.delete(`/admin/job/${id}`);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  if (loading) {
    return <h2>Loading Admin Dashboard...</h2>;
  }

  return (
    <div className="container">
      <h2>🧑‍💼 Admin Dashboard</h2>

      <h3>📊 Stats</h3>
      <p>Users: {stats.users}</p>
      <p>Jobs: {stats.jobs}</p>
      <p>Applications: {stats.applications}</p>

      <h3>👥 Users</h3>
      {users.map((u) => (
        <div key={u.id}>
          {u.full_name} ({u.role})
          <button onClick={() => deleteUser(u.id)}>Delete</button>
        </div>
      ))}

      <h3>💼 Jobs</h3>
      {jobs.map((j) => (
        <div key={j.id}>
          {j.title}
          <button onClick={() => deleteJob(j.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;