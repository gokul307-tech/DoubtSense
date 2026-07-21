import { useState } from "react";
import axios from "axios";

function DoubtForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const submitDoubt = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/doubts?student_id=1",
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
    } catch (err) {
      console.log(err);
      alert("Failed to submit doubt");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Post a Doubt</h2>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Describe your doubt"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
        cols="40"
      />

      <br /><br />

      <input
        type="number"
        min="1"
        max="5"
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
      />

      <br /><br />

      <button onClick={submitDoubt}>
        Submit Doubt
      </button>
    </div>
  );
}

export default DoubtForm;