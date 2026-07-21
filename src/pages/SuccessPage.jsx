import { Link } from "react-router-dom";

export default function PetitionSubmittedPage() {
  return (
    <div className="submitted-page">
      <h1>🎉 Petition Submitted</h1>

      <p>
        Your petition has been successfully submitted.
      </p>

      <p>
        It is now awaiting review and public support.
      </p>

      <div style={{marginTop: "30px"}}>
        <Link to="/dashboard">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}