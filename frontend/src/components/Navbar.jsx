import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ✅ only ONE user declaration
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "10px",
        background: "#222",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#fff",
      }}
    >
      {/* LEFT LINKS */}
      <Link to="/" style={{ color: "#fff" }}>Home</Link>
      <Link to="/jobs" style={{ color: "#fff" }}>Jobs</Link>

      {/* PLAN DISPLAY */}
      {user && (
        <span style={{ marginLeft: "10px", color: "yellow" }}>
          Plan: {user?.plan === "pro" ? "🔥 PRO" : "FREE"}
        </span>
      )}

      {/* RIGHT SIDE */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
        {!user && (
          <>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff" }}>Register</Link>
          </>
        )}

        {user?.role === "candidate" && (
          <Link to="/candidate-dashboard" style={{ color: "#fff" }}>
            Dashboard
          </Link>
        )}

        {user?.role === "recruiter" && (
          <Link to="/recruiter-dashboard" style={{ color: "#fff" }}>
            Recruiter
          </Link>
        )}

        {user && (
          <button onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;