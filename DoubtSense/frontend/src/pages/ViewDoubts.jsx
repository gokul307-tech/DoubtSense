import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function ViewDoubts() {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const res = await api.get("/doubts");
      setDoubts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resolveDoubt = async (id) => {
    const teacher_response =
      prompt("Enter explanation:");

    const resource_link =
      prompt("Enter resource link:");

    try {
      await api.put(
        `/teacher/resolve/${id}`,
        {
          teacher_response,
          resource_link,
        }
      );

      alert("Resolved!");

      fetchDoubts();
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
          padding: "30px",
          background:
            "linear-gradient(135deg,#7DB7FF,#3F8CFF)",
        }}
      >
        <h1
          style={{
            color: "white",
          }}
        >
          📋 All Student Doubts
        </h1>

        {doubts.map((doubt) => (
          <div
            key={doubt.id}
            style={{
              background:
                "rgba(255,255,255,0.15)",
              backdropFilter: "blur(15px)",
              padding: "20px",
              borderRadius: "20px",
              marginTop: "20px",
              color: "white",
            }}
          >
            <h3>{doubt.topic}</h3>

            <p>
              Subject: {doubt.subject}
            </p>

            <p>
              Difficulty: ⭐
              {doubt.difficulty}
            </p>

            <p>
              Status: {doubt.status}
            </p>

            <p>
              {doubt.description}
            </p>

            {doubt.status !==
              "resolved" && (
              <button
                onClick={() =>
                  resolveDoubt(
                    doubt.id
                  )
                }
                style={{
                  background:
                    "#22c55e",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 18px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                Resolve Doubt
              </button>
            )}

            {doubt.status ===
              "resolved" && (
              <>
                <hr />

                <p>
                  <b>
                    Teacher
                    Response:
                  </b>
                </p>

                <p>
                  {
                    doubt.teacher_response
                  }
                </p>

                <a
                  href={
                    doubt.resource_link
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  📚 Resource
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewDoubts;