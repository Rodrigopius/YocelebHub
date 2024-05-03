import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESAGING_SENDER_ID,
//   appId: import.meta.env.APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4oTiJJ1AbYnls5l-VZa3IFRDEDgiQ3cI",
  authDomain: "yoceleb-app-31d75.firebaseapp.com",
  projectId: "yoceleb-app-31d75",
  storageBucket: "yoceleb-app-31d75.appspot.com",
  messagingSenderId: "912396154906",
  appId: "1:912396154906:web:70e341874be27db9a4f9a3",
  measurementId: "G-YXWF5KWP95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage, db };