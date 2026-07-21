import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage({ user, onLogout }) {
  return (
    <div className="home-page">

      <header className="dashboard-header">

        <div>
          <h1>Community Request Portal</h1>

          <p>
            Welcome back, {user?.displayName || user?.email}
          </p>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Sign Out
        </button>

      </header>

      <section className="hero-card">

        <h2>Welcome 👋</h2>

        <p>
          Submit requests, create petitions, monitor progress,
          and help improve your community, workplace, estate,
          university or organization.
        </p>

      </section>

      <section className="dashboard-grid">

        <Link to="/create" className="dashboard-card">
          <span className="icon">📝</span>

          <h3>Create Request</h3>

          <p>
            Submit a new request or petition.
          </p>
        </Link>

        <Link to="/my-petitions" className="dashboard-card">
          <span className="icon">📂</span>

          <h3>My Requests</h3>

          <p>
            View and manage your submissions.
          </p>
        </Link>

        <Link to="/petitions" className="dashboard-card">
          <span className="icon">🌍</span>

          <h3>Browse Requests</h3>

          <p>
            Explore requests created by the community.
          </p>
        </Link>

        <Link to="/admin" className="dashboard-card">
          <span className="icon">🛡</span>

          <h3>Admin Panel</h3>

          <p>
            Manage requests and platform activity.
          </p>
        </Link>

      </section>

    </div>
  );
}