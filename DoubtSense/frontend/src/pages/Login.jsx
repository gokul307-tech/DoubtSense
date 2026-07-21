import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      if (res.data.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#7db7ff,#3f8cff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "1100px",
          height: "650px",
          borderRadius: "30px",
          background:
            "linear-gradient(135deg,#003c91,#006eff)",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.25)",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Login Card */}

        <div
          style={{
            width: "450px",
            padding: "40px",
            borderRadius: "25px",
            background:
              "rgba(255,255,255,0.12)",
            backdropFilter: "blur(15px)",
            border:
              "1px solid rgba(255,255,255,0.2)",
            color: "white",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Welcome Back!
          </p>

          <h1
            style={{
              fontSize: "52px",
              marginTop: "0",
              marginBottom: "30px",
            }}
          >
            Login
          </h1>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              marginBottom: "25px",
              fontSize: "16px",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "15px",
              background: "#002d72",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign In
          </button>

          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <span>
              Don't have an account?{" "}
            </span>

            <Link
              to="/register"
              style={{
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Decorative Shapes */}

        <div
          style={{
            position: "absolute",
            left: "120px",
            top: "150px",
            width: "90px",
            height: "90px",
            borderRadius: "25px",
            background:
              "rgba(255,255,255,0.25)",
            transform: "rotate(45deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "130px",
            top: "120px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border:
              "20px solid rgba(0,0,0,0.15)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "180px",
            bottom: "100px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            border:
              "25px solid rgba(255,255,255,0.12)",
          }}
        />
      </div>
    </div>
  );
}

export default Login;