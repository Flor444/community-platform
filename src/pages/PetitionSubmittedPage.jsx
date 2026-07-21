import { Link, useLocation } from "react-router-dom";
import "./PetitionSubmittedPage.css";

export default function PetitionSubmittedPage() {
const { state } = useLocation();
if (!state) {
  return (
    <div className="success-page">
      <div className="success-card">
        <h1>No Submission Found</h1>

        <p>
          This page is only available immediately after submitting a request.
        </p>

        <Link to="/home" className="btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-header">
          <div className="success-icon">✓</div>

          <h1>Petition Successfully Submitted</h1>

          <p>
            Thank you for participating in civic engagement.
            Your petition has been received and is currently
            awaiting administrative review before publication.
          </p>
        </div>

        <div className="status-box">
          <h3>Current Status</h3>

          <p className="status">
            Awaiting Administrative Review
          </p>
        </div>

{state && (
  <div className="submission-details">
    <h2>Submission Details</h2>

    <p>
  <strong>Reference Number:</strong> {state.referenceNumber}
</p>

<p>
  <strong>Status:</strong> {state.status}
</p>

    <p>
      <strong>Title:</strong> {state.title}
    </p>

    <p>
      <strong>Category:</strong> {state.category}
    </p>

    <p>
      <strong>Authority:</strong> {state.authority}
    </p>

    <p>
      <strong>Signature Goal:</strong> {state.signatureGoal}
    </p>
  </div>
)}

        <div className="next-steps">
          <h2>What Happens Next?</h2>

          <ul>
            <li>
              Your submission will be reviewed for compliance
              with platform guidelines.
            </li>

            <li>
              Approved petitions will become publicly visible.
            </li>

            <li>
              Citizens will be able to sign and support
              the petition.
            </li>

            <li>
              Signature counts and engagement statistics
              will be tracked automatically.
            </li>

            <li>
              Relevant authorities may provide official
              responses where applicable.
            </li>
          </ul>
        </div>

        <div className="action-buttons">
        <Link to="/home" className="btn-primary">
              Return to Dashboard
            </Link>
          <Link to="/petitions" className="btn-secondary">
            Browse Petitions
          </Link>
        </div>

      </div>
    </div>
  );
}