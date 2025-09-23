import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC94282nvuF2Jhq7kwuHVHFVz77-HVAITA",
  authDomain: "los-pollos-fritos.firebaseapp.com",
  projectId: "los-pollos-fritos",
  storageBucket: "los-pollos-fritos.firebasestorage.app",
  messagingSenderId: "895605533644",
  appId: "1:895605533644:web:7adaee744a5489cf834b69"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);