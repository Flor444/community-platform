import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">

      <div className="floating circle1"></div>
      <div className="floating circle2"></div>
      <div className="floating circle3"></div>

      <nav className="navbar">

        <h2 className="logo">
          Community Request Portal
        </h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>

          <Link to="/auth" className="login-btn">
            Sign In
          </Link>
        </div>

      </nav>

      <section className="hero">

        <div className="glass-card">

          <h1>
            Connecting Communities,
            <br />
            Solving Problems Together
          </h1>

          <p>
            Submit complaints, requests and community issues,
            receive a tracking reference, monitor progress,
            and help improve your estate, workplace,
            university or organization.
          </p>

          <div className="hero-buttons">

            <Link to="/auth" className="primary-btn">
              🚀 Get Started
            </Link>

            <Link to="/petitions" className="secondary-btn">
              🌍 Browse Requests
            </Link>

          </div>

        </div>

      </section>

      <section id="features" className="features">

        <div className="feature-card">
          <span>📝</span>
          <h3>Create Requests</h3>

          <p>
            Submit complaints, petitions and service requests.
          </p>
        </div>

        <div className="feature-card">
          <span>📊</span>
          <h3>Track Progress</h3>

          <p>
            Receive a reference number and monitor updates.
          </p>
        </div>

        <div className="feature-card">
          <span>👥</span>
          <h3>Community Support</h3>

          <p>
            Allow members to support important requests.
          </p>
        </div>

        <div className="feature-card">
          <span>🏢</span>
          <h3>For Every Community</h3>

          <p>
            Estates, schools, companies,
            organizations and universities.
          </p>
        </div>

      </section>

      <section id="how" className="timeline">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <h3>1</h3>
            <p>Submit a Request</p>
          </div>

          <div className="step">
            <h3>2</h3>
            <p>Administrative Review</p>
          </div>

          <div className="step">
            <h3>3</h3>
            <p>Community Engagement</p>
          </div>

          <div className="step">
            <h3>4</h3>
            <p>Resolution & Updates</p>
          </div>

        </div>

      </section>

    </div>
  );
}