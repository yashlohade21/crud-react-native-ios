import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCYYojZp7rRWCkzNUUiic9CCF6ZAd6V4Xk",
  authDomain: "mynote-intern.firebaseapp.com",
  projectId: "mynote-intern",
  storageBucket: "mynote-intern.appspot.com",
  messagingSenderId: "480189006443",
  appId: "1:480189006443:web:f901dcc283e99dea49a72e",
  measurementId: "G-XS9394VH2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
};
export const FIREBASE_AUTH = auth;