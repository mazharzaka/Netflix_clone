// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_eX5lmxtXA9pEwox3M3aqOqHRdFhd1sU",
  authDomain: "netflix-1820c.firebaseapp.com",
  projectId: "netflix-1820c",
  storageBucket: "netflix-1820c.appspot.com",
  messagingSenderId: "386678954653",
  appId: "1:386678954653:web:9526c4235dd3f7a7b01274",
  measurementId: "G-M2P8MY8BRG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
