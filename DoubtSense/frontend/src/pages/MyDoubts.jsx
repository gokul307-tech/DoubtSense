import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTabs from "../components/PageTabs";
import api from "../api/api";

function MyDoubts() {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const res = await api.get("/student/1/doubts");
      setDoubts(res.data);
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
        <PageTabs />

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            padding: "30px",
            marginTop: "30px",
            color: "white",
          }}
        >
          <h1>📋 My Doubts</h1>

          {doubts.length === 0 ? (
            <p>No doubts submitted yet.</p>
          ) : (
            doubts.map((doubt) => (
              <div
                key={doubt.id}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "20px",
                  borderRadius: "15px",
                  marginTop: "20px",
                }}
              >
                <h3>{doubt.topic}</h3>

                <p>
                  <strong>Subject:</strong>{" "}
                  {doubt.subject}
                </p>

                <p>
                  <strong>Difficulty:</strong> ⭐
                  {doubt.difficulty}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {doubt.status === "resolved"
                    ? "🟢 Resolved"
                    : "🟡 Pending"}
                </p>

                <p>
                  <strong>Description:</strong>
                </p>

                <p>{doubt.description}</p>

                {doubt.status === "resolved" && (
                  <>
                    <hr
                      style={{
                        margin: "15px 0",
                        borderColor:
                          "rgba(255,255,255,0.2)",
                      }}
                    />

                    <h4>
                      👨‍🏫 Teacher Explanation
                    </h4>

                    <p>
                      {doubt.teacher_response}
                    </p>

                    {doubt.resource_link && (
                      <a
                        href={doubt.resource_link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#FFD43B",
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        📚 Open Learning Resource
                      </a>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyDoubts;