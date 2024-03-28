import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: process.env.DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE,
  messagingSenderId: process.env.MESSAGING,
  appId: process.env.APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
