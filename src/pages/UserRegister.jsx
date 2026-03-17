import { useState } from "react";
import axios from "axios";

function UserRegister() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verifierName: ""
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

      await axios.post(
        "https://decentraid-4-4y2v.onrender.com/api/users/register",
        formData
      );

      alert("User Registered Successfully");

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

    }
  };

  return (

    <div>

      <h2>User Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          required
        />

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

        <input
          type="text"
          name="verifierName"
          placeholder="Enter Verifier Name"
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );
}

export default UserRegister;