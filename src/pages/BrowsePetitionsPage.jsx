import { useEffect, useState } from "react";
import { getPetitions } from "../firebase/petitions";
import "./BrowsePetitionsPage.css";

export default function BrowsePetitionsPage() {
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetitions();
  }, []);

  const loadPetitions = async () => {
    try {
      const data = await getPetitions();
      setPetitions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="browse-page">
        <h1>Loading Petitions...</h1>
      </div>
    );
  }

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Public Petitions</h1>
        <p>
          Explore petitions created by citizens and support causes that matter.
        </p>
      </div>

      <div className="petition-grid">
        {petitions.length === 0 ? (
          <p>No petitions found.</p>
        ) : (
          petitions.map((petition) => (
            <div key={petition.id} className="petition-card">
              <span className="petition-category">
                {petition.category}
              </span>

              <h2>{petition.title}</h2>

              <p>{petition.description}</p>

              <div className="petition-footer">
                <span>
                  {petition.signatures || 0} signatures
                </span>

                <span className="status">
                  {petition.status}
                </span>
              </div>

              <button className="view-btn">
                View Petition
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}