import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageTabs from "../components/PageTabs";
import StatsCard from "../components/StatsCard";

import { isLoggedIn } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#7db7ff,#3f8cff)",
          padding: "30px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          <h1>Welcome Back 👋</h1>
          <p>Student Dashboard</p>
        </div>

        <PageTabs />

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <StatsCard
            title="My Doubts"
            value="12"
            color="#ffffff"
          />

          <StatsCard
            title="Pending"
            value="8"
            color="#ffd43b"
          />

          <StatsCard
            title="Resolved"
            value="4"
            color="#69db7c"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;