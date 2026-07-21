import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CreatePetitionPage from "./pages/CreatePetitionPage";
import LandingPage from "./pages/LandingPage";
import PetitionSubmittedPage from "./pages/PetitionSubmittedPage";
import BrowsePetitionsPage from "./pages/BrowsePetitionsPage";
import MyPetitionsPage from "./pages/MyPetitions";

export default function App() {
  const { user, isLoggedIn, loading, logout } = useAuth();

  if (loading) return <div className="app-loading" />;

  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<LandingPage />} />

  <Route
    path="/home"
    element={
      isLoggedIn
        ? <HomePage user={user} onLogout={logout} />
        : <Navigate to="/auth" replace />
    }
  />

  <Route path="/auth" element={<AuthPage />} />

  <Route
    path="/create"
    element={
      isLoggedIn
        ? <CreatePetitionPage user={user} />
        : <Navigate to="/auth" replace />
    }
  />

  <Route
    path="/petitions"
    element={
      isLoggedIn
        ? <BrowsePetitionsPage user={user} />
        : <Navigate to="/auth" replace />
    }
  />

  <Route
    path="/submitted"
    element={
      isLoggedIn
        ? <PetitionSubmittedPage />
        : <Navigate to="/auth" replace />
    }
  />
  <Route
  path="/my-petitions"
  element={
    isLoggedIn
      ? <MyPetitionsPage user={user} />
      : <Navigate to="/auth" replace />
  }
/>

  <Route
    path="/admin"
    element={
      isLoggedIn
        ? <AdminPage user={user} />
        : <Navigate to="/auth" replace />
    }
  />
</Routes>
    </BrowserRouter>
  );
}
