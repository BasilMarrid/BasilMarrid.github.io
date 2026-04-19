import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChLjexH3SKWE0EnnTg2QkjJXA1ScFx8pI",
  authDomain: "reactiongame-78256.firebaseapp.com",
  databaseURL:
    "https://reactiongame-78256-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactiongame-78256",
  storageBucket: "reactiongame-78256.firebasestorage.app",
  messagingSenderId: "617209404948",
  appId: "1:617209404948:web:dbe7519a231b2772b99101",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
