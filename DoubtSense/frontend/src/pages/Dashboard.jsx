import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import PageTabs from "../components/PageTabs";
import StatsCard from "../components/StatsCard";

import { isLoggedIn } from "../utils/auth";
import api from "../api/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_doubts: 0,
    pending_doubts: 0,
    resolved_doubts: 0,
  });

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
      return;
    }

    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get("/student/dashboard");

      setStats({
        total_doubts: res.data.total_doubts || 0,
        pending_doubts: res.data.pending_doubts || 0,
        resolved_doubts: res.data.resolved_doubts || 0,
      });
    } catch (error) {
      console.error("Failed to load student dashboard:", error);
    }
  };

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
            value={stats.total_doubts}
            color="#ffffff"
          />

          <StatsCard
            title="Pending"
            value={stats.pending_doubts}
            color="#ffd43b"
          />

          <StatsCard
            title="Resolved"
            value={stats.resolved_doubts}
            color="#69db7c"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;