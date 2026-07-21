import { useState } from "react";
import { loginEmail } from "../../firebase/auth";
import { friendlyError } from "../../firebase/authErrors";

export default function LoginForm({ onSuccess, t = {} }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginEmail(email, password);
      onSuccess?.();
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input className="auth-input" type="email" placeholder={t.email ?? "Email"} value={email}
        onChange={e => setEmail(e.target.value)} required autoComplete="email" />
      <input className="auth-input" type="password" placeholder={t.password ?? "Password"} value={password}
        onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
      {error && <p className="auth-error">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "..." : (t.loginBtn ?? "Sign In")}
      </button>
    </form>
  );
}
