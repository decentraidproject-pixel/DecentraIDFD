import { useState, useEffect } from "react";
import axios from "axios";

function UserLookup() {
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState([]);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0); // animated display
  const [userName, setUserName] = useState("");

  // Animate score number
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1500;
    const increment = end / (duration / 15);

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

  const handleSearch = async () => {
    if (!email) return alert("Enter email!");
    try {
      const res = await axios.get(`http://localhost:8000/api/posts/userByEmail/${email}`);
      setPosts(res.data.posts);
      setScore(res.data.totalScore); // triggers animation
      setUserName(res.data.userName);
    } catch (err) {
      console.error(err);
      alert("User not found or server error");
      setPosts([]);
      setScore(0);
      setUserName("");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto", backgroundColor:"white" }}>
      <h2>User Lookup Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "100%", maxWidth: "400px", marginRight: "10px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px 16px" }}
        >
          Search
        </button>
      </div>

      {userName && (
        <>
          <h3>{userName} ({email})</h3>

          {/* Animated Score */}
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#4CAF50", margin: "10px 0" }}>
            {displayScore}
          </h1>

          {/* Posts */}
          <div style={{ marginTop: "20px" }}>
            {posts.length === 0 && <p>No approved or rejected posts.</p>}

            {posts.map(post => (
              <div
                key={post._id}
                style={{
                  border: "1px solid gray",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  background: post.status === "approved" ? "#d4ffd4" : "#ffd4d4"
                }}
              >
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <p><b>Verifiers:</b> {post.verifiers.length ? post.verifiers.join(", ") : "None"}</p>
                <p><b>Status:</b> {post.status}</p>
                <p><b>Approved by:</b> {post.approvedBy.length ? post.approvedBy.join(", ") : "None"}</p>
                <p><b>Rejected by:</b> {post.rejectedBy.length ? post.rejectedBy.join(", ") : "None"}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserLookup;