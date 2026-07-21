import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  linkWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./config";

const auth          = getAuth(app);
import {
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

setPersistence(auth, browserLocalPersistence)
  .catch(console.error);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const loginGoogle              = ()            => signInWithPopup(auth, googleProvider);
export const loginGithub              = ()            => signInWithPopup(auth, githubProvider);
export const linkCredential           = (credential)  => linkWithCredential(auth.currentUser, credential);
export const githubCredentialFromError = (err)        => GithubAuthProvider.credentialFromError(err);
export const loginEmail               = (email, pwd)  => signInWithEmailAndPassword(auth, email, pwd);
export const registerEmail            = (email, pwd)  => createUserWithEmailAndPassword(auth, email, pwd);
export const sendMagicLink = (email) => {
  localStorage.setItem("emailForSignIn", email);
  return sendSignInLinkToEmail(auth, email, {
    url: `${window.location.origin}/auth`,
    handleCodeInApp: true,
  });
};
export const isMagicLink       = ()        => isSignInWithEmailLink(auth, window.location.href);
export const completeMagicLink = (email)   => signInWithEmailLink(auth, email, window.location.href);
export const logout            = ()        => signOut(auth);
export const onAuthChange      = (cb)      => onAuthStateChanged(auth, cb);
