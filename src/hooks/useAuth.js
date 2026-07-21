import { useState, useEffect } from "react";
import { onAuthChange, logout as firebaseLogout } from "../firebase/auth";
import { saveUserLogin } from "../firebase/db";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      console.log("AUTH CHANGED:", u);

      setUser(u);
      setLoading(false);

      if (u) {
        saveUserLogin(u).catch(console.error);
      }
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    loading,
    logout: firebaseLogout,
  };
}