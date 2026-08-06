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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#2563eb",
        color: "white",
      }}
    >
      <h2>Password Manager</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </Link>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 18px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "white",
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;