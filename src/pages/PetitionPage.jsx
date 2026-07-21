import { useEffect, useState } from "react";
import { getPetitions } from "../firebase/petitions";

export default function HomePage({ user, onLogout }) {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    loadPetitions();
  }, []);

  async function loadPetitions() {
    const data = await getPetitions();
    setPetitions(data);
  }

  return (
    <div>
      <h1>Online Petition Platform</h1>

      <p>Welcome {user?.displayName}</p>

      <button onClick={onLogout}>
        Sign Out
      </button>

      <hr />

      {petitions.map((petition) => (
        <div key={petition.id}>
          <h3>{petition.title}</h3>
          <p>{petition.description}</p>
          <p>
            Signatures: {petition.signatures}
          </p>
        </div>
      ))}
    </div>
  );
}