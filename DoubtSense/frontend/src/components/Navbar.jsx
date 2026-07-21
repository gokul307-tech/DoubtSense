import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const goToHome = () => {
    if (role === "teacher") {
      navigate("/teacher-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2
        style={{
          cursor: "pointer",
          margin: 0,
          color: "#2563EB", 
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
        onClick={goToHome}
      >
        🎓 DOUBTSENSE
      </h2>

      {/* User Info + Logout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: "#650bdb",
            fontWeight: "500",
          }}
        >
          👤 {name} ({role})
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;