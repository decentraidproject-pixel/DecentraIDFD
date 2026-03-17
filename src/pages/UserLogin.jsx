import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        formData
      );

      alert("Login Successful");
localStorage.setItem("userId", res.data.userId);
 
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("verifierName", res.data.verifierName);

      navigate("/user-dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login failed");

    }

  };

  return (

    <div>

      <h2>User Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default UserLogin;