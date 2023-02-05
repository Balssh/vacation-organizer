import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  getDocs,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { Vacation } from "../interfaces/interfaces";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log(app);
// Export function to initialize Firebase
export const initializeFirebase = () => {
  return app;
};

// Export function to add a vacation to the database
export const addVacation = async (vacation: Vacation) => {
  try {
    const docRef = await addDoc(collection(db, "vacations"), vacation);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Export function to get all vacations from the database
export const getVacations = async () => {
  const vacations: Vacation[] = [];
  const querySnapshot = await getDocs(collection(db, "vacations"));
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    vacations.push({ id: doc.id, ...doc.data() } as Vacation);
  });
  return vacations;
};

// Export function to get all vacations of a user from the database
export const getUserVacations = async (userId: string) => {
  const q = query(collection(db, "vacations"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// Export function to update a vacation in the database
export const updateVacation = async (vacation: Vacation, docID: string) => {
  try {
    const docRef = doc(db, "vacations", docID);
    await setDoc(docRef, vacation);
    console.log("Document updated successfully");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
