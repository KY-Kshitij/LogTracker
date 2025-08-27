// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJqTxJl42keu_E7xLLblT2Aoo_Q0GIgRY",
  authDomain: "logtracker-2022-26.firebaseapp.com",
  projectId: "logtracker-2022-26",
  storageBucket: "logtracker-2022-26.firebasestorage.app",
  messagingSenderId: "797657620227",
  appId: "1:797657620227:web:34ade4f1c663c5fb5f5336"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export { auth };
