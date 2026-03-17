import { useState, useEffect } from "react";
import axios from "axios";
import "../Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [type, setType] = useState("");
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null); // selected institution details
  const [activePanel, setActivePanel] = useState(null); // "basic" or "full"
  const navigate = useNavigate();

  // Redirect if adminToken not found
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch list by type
  const fetchList = async (t) => {
    if (!t) {
      setList([]);
      setSelected(null);
      return;
    }

    try {
      const endpoint =
        activePanel === "basic"
          ? `http://localhost:8000/api/institution/admin/type/${t}`
          : `http://localhost:8000/api/institution/admin/fulltype/${t}`;

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      });
      setList(res.data);
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Failed to load institutions");
    }
  };

  // When type changes, fetch data for the active panel
  useEffect(() => {
    if (type && activePanel) {
      fetchList(type);
    }
  }, [type, activePanel]);

  // Load full details of selected institution (only needed for full panel)
  const loadDetails = async (id) => {
    if (!id) return;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/institution/admin/details/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken"),
          },
        }
      );
      setSelected(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load details");
    }
  };

  // Approve selected institution
  const approve = async () => {
    if (!selected) return;
    try {
      await axios.post(
        `http://localhost:8000/api/institution/admin/approve/${selected._id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken"),
          },
        }
      );
      alert("Institution Approved!");
      setList((prev) => prev.filter((i) => i._id !== selected._id));
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  // Reject selected institution
  const reject = async () => {
    if (!selected) return;
    try {
      await axios.post(
        `http://localhost:8000/api/institution/admin/reject/${selected._id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("adminToken"),
          },
        }
      );
      alert("Institution Rejected!");
      setList((prev) => prev.filter((i) => i._id !== selected._id));
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  // Reset panel and data
  const handlePanelClick = (panel) => {
    setActivePanel(panel);
    setType("");
    setList([]);
    setSelected(null);
  };

  return (
    <div className="admin-wrap">
      {!activePanel ? (
        <div className="button-panel">
          <button onClick={() => handlePanelClick("basic")}>
            View Basic Institutions
          </button>
          <button onClick={() => handlePanelClick("full")}>
            View Full Institutions
          </button>
        </div>
      ) : (
        <div className="left-right-panel">
          {/* Left panel */}
          <div className="left">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="University">University</option>
              <option value="Company">Company</option>
              <option value="NGO">NGO</option>
            </select>

            <ul>
              {list.length === 0 && type && (
                <p className="empty-text">No institutions found</p>
              )}

              {list.map((i) => (
                <li
                  key={i._id}
                  style={{ cursor: activePanel === "full" ? "pointer" : "default" }}
                  onClick={() => activePanel === "full" && loadDetails(i._id)}
                >
                  {activePanel === "basic" && <span>{i.officialName}</span>}

                  {activePanel === "full" && (
                    <div className="full-details-left">
                      <h4>{i.officialName}</h4>
                      <p><b>Email:</b> {i.email || "-"}</p>
                      <p><b>Contact:</b> {i.contactNumber || "-"}</p>
                      <p><b>Type:</b> {i.organizationType || "-"}</p>
                      <p><b>City:</b> {i.city || "-"}</p>
                      <p><b>Authorized Person:</b> {i.authorizedPersonName || "-"}</p>
                      <p><b>Status:</b> {i.status || "-"}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right panel */}
          <div className="right">
            {selected && (
              <div className="details-right">
                <h3>{selected.officialName}</h3>
                <p><b>Email:</b> {selected.email || "-"}</p>
                <p><b>Contact:</b> {selected.contactNumber || "-"}</p>
                <p><b>Type:</b> {selected.organizationType || "-"}</p>
                <p><b>City:</b> {selected.city || "-"}</p>
                <p><b>Authorized Person:</b> {selected.authorizedPersonName || "-"}</p>
                <p><b>Status:</b> {selected.status || "-"}</p>

                <div className="btns">
                  <button className="ok" onClick={approve}>Approve</button>
                  <button className="no" onClick={reject}>Reject</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
