import React, { useEffect, useState } from "react";
import axios from "axios";
import "../User.css";

const User = () => {
  const [approvedInstitutions, setApprovedInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApproved();
  }, []);

const fetchApproved = async () => {
  try {
    const res = await axios.get("https://decentraid-4-4y2v.onrender.com/api/user/approved"); // must match backend
    setApprovedInstitutions(res.data);
  } catch (err) {
    console.error("Error fetching approved institutions:", err.message);
    setMessage("Failed to load approved institutions");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://decentraid-4-4y2v.onrender.com/api/user/register", {
        fullName,
        email,
        contactNumber,
        selectedInstitution,
      });
      setMessage(res.data.message);
      setFullName("");
      setEmail("");
      setContactNumber("");
      setSelectedInstitution("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="user-container">
      <h2>User Registration</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <select
          value={selectedInstitution}
          onChange={(e) => setSelectedInstitution(e.target.value)}
        >
          <option value="">Select Approved Institution</option>
          {approvedInstitutions.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.officialName}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default User;