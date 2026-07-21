import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import GoogleButton from "../components/auth/GoogleButton";
import GithubButton from "../components/auth/GithubButton";
import MagicLinkForm from "../components/auth/MagicLinkForm";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { loginGoogle, loginGithub, linkCredential, githubCredentialFromError,
         isMagicLink, completeMagicLink } from "../firebase/auth";
import { friendlyError } from "../firebase/authErrors";
import "./AuthPage.css";
import authBackground from "../assets/auth-background.gif";
const T = {
  login: "Sign In", register: "Sign Up",
  google: "Continue with Google", github: "Continue with GitHub",
  email: "Email", password: "Password",
  confirmPassword: "Confirm password",
  loginBtn: "Sign In", registerBtn: "Sign Up",
  passwordMismatch: "Passwords do not match.",
  linkPrompt: "This email is already registered with Google. Click to link both accounts.",
  linkGoogle: "Link with Google",
  magicBtn: "Send magic link",
  magicSent: "Check your email — link sent.",
  magicToggle: "Sign in without password →",
  magicBack: "← Use password",
  magicEmailPrompt: "Open the link from the same device you used to request it.",
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab,         setTab]         = useState(searchParams.get("tab") || "login");
  const [magicMode,   setMagicMode]   = useState(false);
  const [error,       setError]       = useState(null);
  const [pendingCred, setPendingCred] = useState(null);


  useEffect(() => {
    if (!isMagicLink()) return;
    const email = localStorage.getItem("emailForSignIn") || "";
    if (!email) { setError(T.magicEmailPrompt); return; }
    completeMagicLink(email)
      .then(() => localStorage.removeItem("emailForSignIn"))
      .catch(err => setError(friendlyError(err)));
  }, []);

const handleGoogle = async () => {
  setError(null);

  try {
    const result = await loginGoogle();

    console.log("Google login succeeded:", result.user);

    navigate("/home");

  } catch (err) {
    console.error(err);
    setError(friendlyError(err));
  }
};

  const handleGithub = async () => {
    setError(null);
    try { await loginGithub(); }
    catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setPendingCred(githubCredentialFromError(err));
      } else {
        setError(friendlyError(err));
      }
    }
  };

  const handleLinkGoogle = async () => {
    setError(null);
    try { await loginGoogle(); await linkCredential(pendingCred); }
    catch (err) { setError(friendlyError(err)); }
  };

  return (
    <div className="auth-page"
     style={{
    backgroundImage: `url(${authBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <div className="auth-social">
        <GoogleButton onClick={handleGoogle} label={T.google} />
        <GithubButton onClick={handleGithub} label={T.github} />
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab-btn${tab === "login"    ? " active" : ""}`} onClick={() => setTab("login")}>{T.login}</button>
          <button className={`auth-tab-btn${tab === "register" ? " active" : ""}`} onClick={() => setTab("register")}>{T.register}</button>
        </div>
        {tab === "login"
          ? magicMode ? <MagicLinkForm t={T} /> : <LoginForm t={T} />
          : <RegisterForm t={T} />}
        {tab === "login" && (
          <button className="auth-magic-toggle" onClick={() => setMagicMode(m => !m)}>
            {magicMode ? T.magicBack : T.magicToggle}
          </button>
        )}
        {pendingCred && (
          <div className="auth-link-prompt">
            <p>{T.linkPrompt}</p>
            <GoogleButton onClick={handleLinkGoogle} label={T.linkGoogle} />
          </div>
        )}
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}
