import { useState } from "react";
import { sendMagicLink } from "../../firebase/auth";
import { friendlyError } from "../../firebase/authErrors";

export default function MagicLinkForm({ t = {} }) {
  const [email,   setEmail]   = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendMagicLink(email);
      setSent(true);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  if (sent) return <p className="auth-magic-sent">{t.magicSent ?? "Check your email — link sent."}</p>;

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="email" className="auth-input" value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t.email ?? "Email"} required />
      {error && <p className="auth-error">{error}</p>}
      <button type="submit" className="btn-primary" disabled={loading || !email}>
        {loading ? "..." : (t.magicBtn ?? "Send magic link")}
      </button>
    </form>
  );
}
