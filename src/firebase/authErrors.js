const MESSAGES = {
  en: {
    "auth/user-not-found":           "Email not registered.",
    "auth/wrong-password":           "Wrong password.",
    "auth/invalid-credential":       "Invalid email or password.",
    "auth/invalid-login-credentials":"Invalid email or password.",
    "auth/invalid-email":            "Invalid email format.",
    "auth/email-already-in-use":     "Email already registered.",
    "auth/weak-password":            "Password too short (min. 6 characters).",
    "auth/too-many-requests":        "Too many attempts. Try again later.",
    "auth/popup-closed-by-user":     "Login cancelled.",
    "auth/account-exists-with-different-credential":
      "This email is already registered with another provider. Use Google to sign in.",
    fallback: "Unexpected error. Please try again.",
  },
};

export const friendlyError = (err) => {
  const msgs = MESSAGES.en;
  return msgs[err?.code] ?? msgs.fallback;
};
