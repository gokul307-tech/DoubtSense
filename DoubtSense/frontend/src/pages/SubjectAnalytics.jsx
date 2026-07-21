import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function SubjectAnalytics() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []); 

  const fetchSubjects = async () => {
    try {
      const res = await api.get(
        "/teacher/subjects"
      );

      setSubjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getBarColor = (count) => {
    if (count >= 10) return "#EF4444";
    if (count >= 5) return "#F59E0B";
    return "#22C55E";
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
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "40px",
          }}
        >
          <h1>📚 Subject Analytics</h1>

          <p>
            Analyze which subjects generate
            the highest number of doubts.
          </p>
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            borderRadius: "20px",
            padding: "30px",
            color: "white",
          }}
        >
          <h2>Subject-wise Doubts</h2>

          {subjects.length === 0 ? (
            <p>No data available.</p>
          ) : (
            subjects.map((subject, index) => (
              <div
                key={index}
                style={{
                  marginTop: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <span>
                    {subject[0]}
                  </span>

                  <span>
                    {subject[1]} doubts
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
                      width: `${
                        subject[1] * 10
                      }%`,
                      height: "100%",
                      borderRadius:
                        "20px",
                      background:
                        getBarColor(
                          subject[1]
                        ),
                      transition:
                        "0.5s",
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}

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
          <h2>📈 Insights</h2>

          {subjects.length > 0 ? (
            <p>
              Most doubts are currently coming
              from <b>{subjects[0][0]}</b>.
              Teachers may consider conducting
              additional revision sessions in
              this subject.
            </p>
          ) : (
            <p>
              No analytics available yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default SubjectAnalytics;