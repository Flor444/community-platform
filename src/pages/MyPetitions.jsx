import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPetitions.css";
import {
  getMyPetitions,
  deletePetition,
} from "../firebase/petitions";

export default function MyPetitionsPage({ user }) {
    const navigate = useNavigate();
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    async function loadPetitions() {
      try {
        const data = await getMyPetitions(user.uid);
        setPetitions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPetitions();
  }, [user]);

  const handleDelete = async (id) => {

  const confirmed = window.confirm(
    "Are you sure you want to delete this petition?"
  );

  if (!confirmed) return;

  try {

    await deletePetition(id);

    setPetitions((current) =>
      current.filter((petition) => petition.id !== id)
    );

  } catch (error) {

    console.error(error);

    alert("Unable to delete petition.");

  }

};

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="my-petitions-page">

    <div className="page-header">
      <div>
        <h1>My Petitions</h1>
        <p>Manage and track all the petitions you've created.</p>
      </div>

      <button
        className="new-btn"
        onClick={() => navigate("/create")}
      >
        + New Petition
      </button>
    </div>

    <div className="toolbar">

      <input
        className="search-bar"
        placeholder="🔍 Search petitions..."
      />

      <div className="view-toolbar">

        <button
          onClick={() => setViewMode("grid")}
          className={viewMode === "grid" ? "active" : ""}
        >
          ⊞
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={viewMode === "list" ? "active" : ""}
        >
          ☰
        </button>

        <button
          onClick={() => setViewMode("detail")}
          className={viewMode === "detail" ? "active" : ""}
        >
          📝
        </button>

      </div>

    </div>

    {petitions.length === 0 ? (

      <div className="empty-state">
        <h2>No petitions yet</h2>
        <p>Create your first petition to get started.</p>
      </div>

    ) : (

      <div className={`petitions ${viewMode}`}>

        {petitions.map((petition) => (

          <div key={petition.id} className="petition-card">

            <div className="card-top">

              <h2>{petition.title}</h2>

              <span className="status">
                {petition.status}
              </span>

            </div>

            <div className="card-info">

              <p>
                <strong>Reference</strong><br />
                {petition.referenceNumber}
              </p>

              <p>
                <strong>Category</strong><br />
                {petition.category}
              </p>

              <p>
                <strong>Authority</strong><br />
                {petition.authority}
              </p>

              <p>
                <strong>Goal</strong><br />
                {petition.signatureGoal} Signatures
              </p>

            </div>

            <div className="card-actions">

              <button className="view-btn">
                View
              </button>

              <button className="edit-btn">
                Edit
              </button>

             <button
  className="delete-btn"
  onClick={() => handleDelete(petition.id)}
>
  🗑 Delete
</button>
            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}
