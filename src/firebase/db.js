import { db } from "./config";
import { doc, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

export async function saveUserLogin(user) {
  await setDoc(doc(db, "users", user.uid), {
    uid:         user.uid,
    email:       user.email,
    displayName: user.displayName ?? null,
    photoURL:    user.photoURL ?? null,
    lastLogin:   serverTimestamp(),
  }, { merge: true });
}

export async function getUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map(d => d.data());
}
