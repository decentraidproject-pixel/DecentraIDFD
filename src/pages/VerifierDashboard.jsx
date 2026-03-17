import { useState, useEffect } from "react";
import axios from "axios";
import "../VerifierDashboard.css";

function VerifierDashboard() {
  const [verifierName, setVerifierName] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setVerifierName(payload.verifierName);
      fetchPosts(token);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://decentraid-4-4y2v.onrender.com/api/posts/verifier", {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const safePosts = res.data.map((post) => ({
        ...post,
        approvedBy: post.approvedBy || [],
        rejectedBy: post.rejectedBy || [],
        verifiers: post.verifiers || [],
      }));

      setPosts(safePosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  
  const handleDecision = async (postId, decision) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `https://decentraid-4-4y2v.onrender.com/api/posts/verify/${postId}`,
        { decision },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      const updatedPost = res.data.post;
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? updatedPost : p))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating post");
    }
  };

  return (
    <div className="verifier-dashboard">
      <h1>Verifier Dashboard</h1>
      <h2>Welcome, {verifierName}</h2>

      <div className="posts-grid">
        {posts.length === 0 && <p>No posts assigned yet.</p>}
        {posts.map((post) => (
          <div
            key={post._id}
            className={`post-card ${
              post.status === "approved"
                ? "approved"
                : post.status === "rejected"
                ? "rejected"
                : ""
            }`}
          >
            <h3>{post.title}</h3>
            <p>{post.description}</p>

            <p>
              <b>Assigned Verifiers:</b>{" "}
              {post.verifiers.length > 0 ? post.verifiers.join(", ") : "None"}
            </p>

            <p>
              <b>Status:</b> {post.status}
            </p>

            <p>
              <b>User Score:</b> {post.userScore}
            </p>

            <div className="buttons">
              <button onClick={() => handleDecision(post._id, "approved")}>
                Approve +10
              </button>
              <button onClick={() => handleDecision(post._id, "rejected")}>
                Reject -5
              </button>
            </div>

            
            <p>
              <b>Approved by:</b>{" "}
              {post.approvedBy.length > 0 ? post.approvedBy.join(", ") : "None"}
            </p>
            <p>
              <b>Rejected by:</b>{" "}
              {post.rejectedBy.length > 0 ? post.rejectedBy.join(", ") : "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerifierDashboard;