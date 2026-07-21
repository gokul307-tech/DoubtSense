function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        width: "220px",
        padding: "25px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(15px)",
        color: "white",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          fontSize: "42px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;