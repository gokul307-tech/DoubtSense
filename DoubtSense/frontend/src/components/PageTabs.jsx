import { useNavigate } from "react-router-dom";

function PageTabs() {
  const navigate = useNavigate();

  const tabStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginTop: "25px",
      }}
    >
      <button
        style={tabStyle}
        onClick={() => navigate("/dashboard")}
      >
        🏠 Dashboard
      </button>

      <button
        style={tabStyle}
        onClick={() => navigate("/submit-doubt")}
      >
        ➕ Post Doubt
      </button>

      <button
        style={tabStyle}
        onClick={() => navigate("/my-doubts")}
      >
        📋 My Doubts
      </button>

      <button
        style={tabStyle}
        onClick={() => navigate("/heatmap")}
      >
        🔥 HeatMap
      </button>
    </div>
  );
}

export default PageTabs;