import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export async function createPetition(data) {
  const referenceNumber =
    "REQ-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const docRef = await addDoc(collection(db, "petitions"), {
    ...data,
    referenceNumber,
    signatures: 0,
    status: "Awaiting Review",
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    referenceNumber,
  };
}

export async function getPetitions() {
  const snap = await getDocs(collection(db, "petitions"));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
export async function getMyPetitions(userId) {
  const q = query(
    collection(db, "petitions"),
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
export async function deletePetition(id) {
  await deleteDoc(doc(db, "petitions", id));
}
