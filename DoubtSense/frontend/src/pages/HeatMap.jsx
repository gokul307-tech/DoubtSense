import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTabs from "../components/PageTabs";
import api from "../api/api";

function HeatMap() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await api.get(
        "/teacher/top-topics"
      );

      setTopics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getColor = (count) => {
    if (count >= 10) return "#ef4444";
    if (count >= 5) return "#f97316";
    if (count >= 3) return "#eab308";
    return "#22c55e";
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
        <PageTabs />

        {/* Header */}

        <div
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "30px",
          }}
        >
          <h1>🔥 HeatMap Analytics</h1>

          <p>
            Discover the most confusing topics
            across all student doubts.
          </p>
        </div>

        {/* Summary Cards */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h2>{topics.length}</h2>
            <p>Total Topics</p>
          </div>

          <div style={cardStyle}>
            <h2>
              {topics.length > 0
                ? topics[0][0]
                : "N/A"}
            </h2>
            <p>Most Confusing Topic</p>
          </div>
        </div>

        {/* HeatMap */}

        <div
          style={{
            marginTop: "40px",
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            padding: "25px",
            color: "white",
          }}
        >
          <h2>🔥 Topic HeatMap</h2>

          {topics.map((topic, index) => (
            <div
              key={index}
              style={{
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>{topic[0]}</span>

                <span>
                  {topic[1]} doubts
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "20px",
                  background:
                    "rgba(255,255,255,0.2)",
                  borderRadius: "20px",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    width: `${topic[1] * 10}%`,
                    height: "100%",
                    background:
                      getColor(topic[1]),
                    borderRadius: "20px",
                    transition: "0.5s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}

        <div
          style={{
            marginTop: "30px",
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            padding: "25px",
            color: "white",
          }}
        >
          <h2>📊 Heat Levels</h2>

          <p>🔴 10+ doubts → Critical</p>

          <p>🟠 5+ doubts → High</p>

          <p>🟡 3+ doubts → Medium</p>

          <p>🟢 Below 3 doubts → Low</p>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  borderRadius: "20px",
  padding: "25px",
  minWidth: "250px",
  textAlign: "center",
  color: "white",
};

export default HeatMap;