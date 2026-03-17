import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://decentraid-4-4y2v.onrender.com/api/institution/admin/login",
        { username, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert("Invalid admin");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(to right, #77ddef, #b18bd9, #84b3c7)",
  };

  const boxStyle = {
    maxWidth: "400px",
    width: "100%",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    padding: "12px 15px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "12px 15px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4B6CB7",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#182848",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Login</h3>

        <input
          style={inputStyle}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={buttonStyle}
          onClick={login}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
