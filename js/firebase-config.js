// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  push,
  child
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXU1C-aVYv3v2stCbedWzwOTLuvV8Ibw0",
  authDomain: "heliance-forex.firebaseapp.com",
  databaseURL: "https://heliance-forex-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "heliance-forex",
  storageBucket: "heliance-forex.firebasestorage.app",
  messagingSenderId: "513478442490",
  appId: "1:513478442490:web:bbaec819e0ea9bbe50f843",
  measurementId: "G-M47H10SM18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth, db,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,
  ref, set, get, update, remove, onValue, push, child
};

// Multiplier tiers
export const TIERS = [
  { stake: 500,   multiplier: 2,    cap: 1000 },
  { stake: 1000,  multiplier: 2.5,  cap: 1000 },
  { stake: 1500,  multiplier: 3,    cap: 1000 },
  { stake: 3000,  multiplier: 3.5,  cap: 1000 },
  { stake: 6000,  multiplier: 4,    cap: 1000 },
  { stake: 12000, multiplier: 4.5,  cap: 500  },
  { stake: 20000, multiplier: 5,    cap: 500  },
  { stake: 50000, multiplier: 20,   cap: 100  }
];

export function getTierForAmount(amount) {
  let tier = null;
  for (const t of TIERS) {
    if (amount >= t.stake) tier = t;
  }
  return tier;
}

// Generate referral code
export function generateRefCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'HEL-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Admin email
export const ADMIN_EMAIL = 'theheliance@gmail.com';
