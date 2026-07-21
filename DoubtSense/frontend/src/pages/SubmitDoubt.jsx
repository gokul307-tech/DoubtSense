import { useState } from "react";
import Navbar from "../components/Navbar";
import PageTabs from "../components/PageTabs";
import api from "../api/api";

function SubmitDoubt() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const handleSubmit = async () => {
    try {
      await api.post(
        "/doubts?student_id=1",
        {
          subject,
          topic,
          description,
          difficulty,
        }
      );

      alert("Doubt submitted successfully!");

      setSubject("");
      setTopic("");
      setDescription("");
      setDifficulty(1);
    } catch (error) {
      alert("Failed to submit doubt");
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
            maxWidth: "700px",
            margin: "40px auto",
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            padding: "30px",
            color: "white",
          }}
        >
          <h1>➕ Submit Doubt</h1>

          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Topic"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Describe your doubt..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            style={{
              ...inputStyle,
              height: "120px",
            }}
          />

          <input
            type="number"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(Number(e.target.value))
            }
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#2563EB",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit Doubt
          </button>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
};

export default SubmitDoubt;