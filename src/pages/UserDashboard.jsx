import { useEffect, useState } from "react";
import axios from "axios";

// Animated Trust Score Number
function TrustScore({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1500; // animation duration in ms
    const increment = end / (duration / 15); // update every 15ms

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayScore(Math.floor(start));
    }, 15);

    return () => clearInterval(counter);
  }, [score]);

  return (
    <div style={{ textAlign: "center", margin: "30px 0" }}>
      <span
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #4CAF50, #00bfff, #ffcc00)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          display: "inline-block",
          animation: "pulse 1.2s infinite alternate",
        }}
      >
        {displayScore}
      </span>
      <p style={{ fontSize: "20px", color: "#555", marginTop: "10px" }}>Trust Score</p>

      {/* Optional keyframes for subtle pulsing */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

function UserDashboard() {
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  const [score, setScore] = useState(50);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [selectedVerifiers, setSelectedVerifiers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchInstitutions();
    fetchPosts();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/institutions/approved");
      setInstitutions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/posts/user/${userId}`);
      const safePosts = res.data.map(post => ({
        ...post,
        verifiers: post.verifiers || [],
        approvedBy: post.approvedBy || [],
        rejectedBy: post.rejectedBy || [],
      }));
      setPosts(safePosts);

      const totalScore = 50 + safePosts.reduce((acc, p) => {
        if (p.status === "approved") return acc + 10;
        if (p.status === "rejected") return acc - 5;
        return acc;
      }, 0);
      setScore(totalScore);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (e) => {
    const options = [...e.target.selectedOptions];
    setSelectedVerifiers(options.map(o => o.value));
  };

  const submitPost = async () => {
    if (!title || !description) {
      alert("Title and Description required!");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/posts/create", {
        userId,
        title,
        description,
        verifiers: selectedVerifiers,
      });
      setTitle("");
      setDescription("");
      setSelectedVerifiers([]);
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Failed to submit post");
    }
  };

  const countByStatus = (status) => posts.filter(p => p.status === status).length;
  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.status === filter);

  return (
    <div style={{ padding: "30px", backgroundColor: "white" }}>
      <h2>User Dashboard</h2>
      <p><b>Name:</b> {name}</p>
      <p><b>Email:</b> {email}</p>

      {/* Fancy Animated Trust Score Number */}
      <TrustScore score={score} />

      <br />
      <button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add Content"}</button>

      {showForm && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px", width: "400px" }}>
          <h3>Submit Content</h3>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          <br /><br />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "8px" }} />
          <br /><br />
          <select multiple value={selectedVerifiers} onChange={handleSelect} style={{ width: "100%", padding: "8px" }}>
            {institutions.map(inst => <option key={inst._id} value={inst.officialName}>{inst.officialName}</option>)}
          </select>
          <br /><br />
          <button onClick={submitPost} style={{ padding: "10px 20px" }}>Submit</button>
        </div>
      )}

      {/* Filter Buttons */}
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>All ({posts.length})</button>
        <button onClick={() => setFilter("pending")}>Pending ({countByStatus("pending")})</button>
        <button onClick={() => setFilter("approved")}>Approved ({countByStatus("approved")})</button>
        <button onClick={() => setFilter("rejected")}>Rejected ({countByStatus("rejected")})</button>
      </div>

      {/* Posts */}
      <div>
        {filteredPosts.length === 0 && <p>No posts to show.</p>}
        {filteredPosts.map(post => (
          <div key={post._id} style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            background: post.status === "approved" ? "#d4ffd4" : post.status === "rejected" ? "#ffd4d4" : "#f5f5f5",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <p><b>Verifiers:</b> {post.verifiers.length ? post.verifiers.join(", ") : "None"}</p>
            <p><b>Status:</b> {post.status}</p>
            <p><b>Approved by:</b> {post.approvedBy.length ? post.approvedBy.join(", ") : "None"}</p>
            <p><b>Rejected by:</b> {post.rejectedBy.length ? post.rejectedBy.join(", ") : "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;