import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUUyJHbl9p5OpSUmdFbwPCvlglSPR2y5I",
  authDomain: "norms-apparel.firebaseapp.com",
  projectId: "norms-apparel",
  storageBucket: "norms-apparel.appspot.com",
  messagingSenderId: "724520256045",
  appId: "1:724520256045:web:9c124c6004270325d62ea4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { db, auth, storage };
