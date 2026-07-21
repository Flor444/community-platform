import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPetition } from "../firebase/petitions";
import "./CreatePetitionPage.css";

export default function CreatePetitionPage({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [authority, setAuthority] = useState("");
const [customAuthority, setCustomAuthority] = useState("");
const [signatureGoal, setSignatureGoal] = useState(500);

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const petition = {
      title,
      description,
      category:
        category === "Other"
          ? customCategory
          : category,

      authority:
        authority === "Other"
          ? customAuthority
          : authority,

      signatureGoal,

      userId: user.uid,
      userName: user.displayName || user.email,
    };

    console.log("Submitting petition:", petition);

  const result = await createPetition(petition);

navigate("/submitted", {
  state: {
    ...petition,
    id: result.id,
    referenceNumber: result.referenceNumber,
    status: "Awaiting Review",
  },
});

    console.log("Navigated!");
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
  }
};

  return (
    <div className="create-page">
      <div className="create-container">
      <h1>Create Petition</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Petition Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

      <div>
  <label>Category</label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="">Select Category</option>
    <option value="Education">Education</option>
    <option value="Environment">Environment</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Security">Security</option>
    <option value="Politics">Politics</option>
    <option value="Business">Business</option>
    <option value="Transportation">Transportation</option>
    <option value="Finance">Finance</option>
    <option value="Other">Other</option>
  </select>

  {category === "Other" && (
    <input
      type="text"
      placeholder="Enter custom category"
      value={customCategory}
      onChange={(e) => setCustomCategory(e.target.value)}
      required
    />
  )}
</div>

<div>
  <label>Petition Authority</label>

  <select
    value={authority}
    onChange={(e) => setAuthority(e.target.value)}
    required
  >
    <option value="">Select Authority</option>

    <option value="Vice Chancellor">
      Vice Chancellor
    </option>

    <option value="University Management">
      University Management
    </option>

    <option value="Student Union">
      Student Union
    </option>

    <option value="Local Government">
      Local Government
    </option>

    <option value="State Government">
      State Government
    </option>

    <option value="Federal Government">
      Federal Government
    </option>

     <option value=" Local Police">
      Local Police
    </option>

     <option value=" Community Center">
      Community Center
    </option>

     <option value="Senate">
     Senate
    </option>

     
     <option value="Minsistry of Security">
   Minsistry of Security
    </option>

    <option value="Minsistry of Justice">
   Minsistry of Justice
    </option>

<option value=" Minsistry of Revenue">
   Minsistry of Revenue
    </option>

    <option value="Other">
      Other
    </option>
  </select>

  {authority === "Other" && (
    <input
      type="text"
      placeholder="Enter Authority Name"
      value={customAuthority}
      onChange={(e) =>
        setCustomAuthority(e.target.value)
      }
      required
    />
  )}
</div>
<div>
  <label>Signature Goal</label>

  <select
    value={signatureGoal}
    onChange={(e) =>
      setSignatureGoal(Number(e.target.value))
    }
  >
    <option value="100">100</option>
    <option value="250">250</option>
    <option value="500">500</option>
    <option value="1000">1000</option>
    <option value="5000">5000</option>
  </select>
</div>
        <div>
          <label>Description</label>

          <textarea
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

      


        <button type="submit">
          Submit Petition
        </button>
      </form>
      </div>
    </div>
  );
}