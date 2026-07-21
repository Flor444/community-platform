# react-firebase-auth-starter

A minimal React + Vite starter with Firebase Authentication wired up and ready to use. Covers the flows that take the most time to get right: Google OAuth, GitHub OAuth, email/password, magic link (passwordless), and account linking when the same email exists across providers.

## What's included

- Google and GitHub sign-in via popup
- Email/password sign-in and registration
- Passwordless sign-in via magic link (email link)
- Account linking — when a GitHub login finds an existing Google account on the same email, it prompts to link rather than failing silently
- `useAuth` hook — single source of truth for auth state across the app
- Firestore user tracking — each login upserts `uid`, `email`, `displayName`, `photoURL`, `lastLogin`
- Protected routes — unauthenticated users are redirected to `/auth` automatically
- Admin page at `/admin` — shows registered users, access controlled by `VITE_ADMIN_EMAIL`
- Friendly error messages mapped from Firebase error codes

## Stack

- React 18 + Vite 5
- Firebase 12 (Auth + Firestore + Analytics)
- React Router v7

## Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** and **Firestore** enabled

## Firebase setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a project.
2. In **Authentication → Sign-in method**, enable:
   - Google
   - GitHub (requires a GitHub OAuth app — [create one here](https://github.com/settings/developers))
   - Email/Password
   - Email link (passwordless)
3. In **Firestore Database**, create a database (start in test mode for development).
4. In **Project Settings → Your apps**, register a web app and copy the config values.

## Getting started

    git clone https://github.com/sanfra/react-firebase-auth-starter
    cd react-firebase-auth-starter
    npm install
    cp .env.example .env.local

Fill in `.env.local` with your Firebase project values and your admin email:

    VITE_FIREBASE_API_KEY=...
    VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your-project
    VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=...
    VITE_FIREBASE_APP_ID=...
    VITE_FIREBASE_MEASUREMENT_ID=...   # optional — leave empty to skip Analytics
    VITE_ADMIN_EMAIL=you@example.com

Then start the dev server:

    npm run dev

## Project structure

    src/
    ├── App.jsx                        # route definitions, auth state guard
    ├── index.css                      # global reset and fade-in keyframe
    ├── firebase/
    │   ├── config.js                  # Firebase app init (reads from env)
    │   ├── auth.js                    # all auth operations
    │   ├── authErrors.js              # Firebase error code → human message
    │   └── db.js                      # Firestore helpers (saveUserLogin, getUsers)
    ├── hooks/
    │   └── useAuth.js                 # auth state hook — user, isLoggedIn, loading, logout
    ├── components/auth/
    │   ├── GoogleButton.jsx
    │   ├── GithubButton.jsx
    │   ├── LoginForm.jsx
    │   ├── RegisterForm.jsx
    │   └── MagicLinkForm.jsx
    └── pages/
        ├── AuthPage.jsx / .css        # login page — tabs, social buttons, magic link
        ├── HomePage.jsx / .css        # protected landing page after login
        └── AdminPage.jsx / .css       # registered users table, VITE_ADMIN_EMAIL gated

## Routes

| Path | Access | Page |
| --- | --- | --- |
| `/auth` | Public | Login / Register |
| `/` | Protected | Home — shows user info and sign-out |
| `/admin` | Protected + admin email | Registered users table |

## Magic link setup

For magic links to work, the redirect URL must be whitelisted in Firebase Console:

**Authentication → Settings → Authorized domains** — add your domain (e.g. `localhost` is already there for development).

The action URL in `auth.js` defaults to `window.location.origin + /auth`. If you deploy to a custom domain, no code change is needed — it picks up the domain automatically.

## Firestore security rules

For production, replace the default open rules with something like:

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{uid} {
          allow read, write: if request.auth != null && request.auth.uid == uid;
        }
        match /users/{uid} {
          allow read: if request.auth.token.email == "<your-admin-email>";
        }
      }
    }

## License

MIT — see [LICENSE](LICENSE).
