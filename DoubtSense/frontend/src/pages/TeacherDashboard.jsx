import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import api from "../api/api";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_students: 0,
    total_doubts: 0,
    pending_doubts: 0,
    resolved_doubts: 0,
  });

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchTopics();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/teacher/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await api.get("/teacher/top-topics");
      setTopics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#7DB7FF,#3F8CFF)",
          padding: "30px",
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            👨‍🏫 Teacher Dashboard
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: "0.9",
            }}
          >
            Monitor student learning patterns and
            identify high-confusion topics.
          </p>
        </div>

        {/* Teacher Navigation */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "35px",
          }}
        >
          <button
            onClick={() =>
              navigate("/teacher-dashboard")
            }
            style={navBtn}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/view-doubts")
            }
            style={navBtn}
          >
            📋 View Doubts
          </button>

          <button
            onClick={() =>
              navigate("/heatmap")
            }
            style={navBtn}
          >
            🔥 HeatMap
          </button>

          <button
            onClick={() =>
              navigate("/subject-analytics")
            }
            style={navBtn}
          >
            📚 Subject Analytics
          </button>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <StatsCard
            title="Students"
            value={stats.total_students}
            color="#ffffff"
          />

          <StatsCard
            title="Total Doubts"
            value={stats.total_doubts}
            color="#FFD43B"
          />

          <StatsCard
            title="Pending"
            value={stats.pending_doubts}
            color="#FF922B"
          />

          <StatsCard
            title="Resolved"
            value={stats.resolved_doubts}
            color="#69DB7C"
          />
        </div>

        {/* Quick Actions */}

        <div
          style={glassCard}
        >
          <h2>⚡ Teacher Actions</h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                navigate("/heatmap")
              }
              style={actionBtnRed}
            >
              🔥 HeatMap Analytics
            </button>

            <button
              onClick={() =>
                navigate("/subject-analytics")
              }
              style={actionBtnBlue}
            >
              📚 Subject Analytics
            </button>

            <button
              onClick={() =>
                navigate("/view-doubts")
              }
              style={actionBtnGreen}
            >
              📋 View All Doubts
            </button>
          </div>
        </div>

        {/* Top Topics */}

        <div style={glassCard}>
          <h2>🔥 Top Confusing Topics</h2>

          {topics.length === 0 ? (
            <p>No doubt data available.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              {topics.map((topic, index) => (
                <div
                  key={index}
                  style={{
                    background:
                      "rgba(255,255,255,0.1)",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                >
                  🔥 {topic[0]}
                  <br />
                  <small>
                    {topic[1]} doubts
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights */}

        <div style={glassCard}>
          <h2>📈 Insights</h2>

          <p>
            Total Doubts:
            {" "}
            {stats.total_doubts}
          </p>

          <p>
            Pending Doubts:
            {" "}
            {stats.pending_doubts}
          </p>

          <p>
            Resolved Doubts:
            {" "}
            {stats.resolved_doubts}
          </p>

          <p>
            Active Students:
            {" "}
            {stats.total_students}
          </p>
        </div>
      </div>
    </>
  );
}

/* Styles */

const glassCard = {
  marginTop: "30px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  border:
    "1px solid rgba(255,255,255,0.2)",
  borderRadius: "20px",
  padding: "25px",
  color: "white",
};

const navBtn = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const actionBtnRed = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#EF4444",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const actionBtnBlue = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#2563EB",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const actionBtnGreen = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "#22C55E",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

export default TeacherDashboard;