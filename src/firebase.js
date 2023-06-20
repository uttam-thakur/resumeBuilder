import firebase from 'firebase/app'
import "firebase/database"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/storage'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDEIpZEPB1F-1EyKGn8GYdlPqDMnxTQbG8",
  authDomain: "cvbuilder-7df42.firebaseapp.com",
  projectId: "cvbuilder-7df42",
  storageBucket: "cvbuilder-7df42.appspot.com",
  messagingSenderId: "400204340314",
  appId: "1:400204340314:web:92d41cd84eb7dbd8fd8c63"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyAvkVNpJXNw6CtBHSAlrqG5TymRs-59lBY",
//   authDomain: "resumebuilder-2bffa.firebaseapp.com",
//   projectId: "resumebuilder-2bffa",
//   storageBucket: "resumebuilder-2bffa.appspot.com",
//   messagingSenderId: "1088898132593",
//   appId: "1:1088898132593:web:501ebdaf58f330669dc9d0",
//   measurementId: "G-Z0HMMRXLGR"
// };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const storage = storage()
export const storage = getStorage()
