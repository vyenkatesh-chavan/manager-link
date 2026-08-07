import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");

      alert("Logout Successful");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <nav className="navbar-nav">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        .navbar-nav {
          --bg-nav: #16202c;
          --border: #253141;
          --accent: #2dd4bf;
          --text: #e7edf3;
          --muted: #8b98a6;

          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 30px;
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-logo {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(45, 212, 191, 0.12);
          color: var(--accent);
        }

        .navbar-title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .navbar-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .navbar-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .navbar-link:hover {
          color: var(--text);
        }

        .navbar-logout-btn {
          padding: 8px 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          background: transparent;
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          transition: border-color 0.15s ease, color 0.15s ease,
            transform 0.05s ease;
        }

        .navbar-logout-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .navbar-logout-btn:active {
          transform: translateY(1px);
        }
      `}</style>

      <div className="navbar-brand">
        <span className="navbar-logo" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <h2 className="navbar-title">Password Manager</h2>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>

        <button onClick={handleLogout} className="navbar-logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;