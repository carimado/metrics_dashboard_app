import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "metrics-dashboard-8af67.firebaseapp.com",
    projectId: "metrics-dashboard-8af67",
    storageBucket: "metrics-dashboard-8af67.appspot.com",
    messagingSenderId: "126926761962",
    appId: "1:126926761962:web:b8f775af29113b0ef38c93",
    measurementId: "G-NC0QPK47BF"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)