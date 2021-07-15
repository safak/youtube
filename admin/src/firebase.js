import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.APP_KEY,
  authDomain: "netflix-151df.firebaseapp.com",
  projectId: "netflix-151df",
  storageBucket: "netflix-151df.appspot.com",
  messagingSenderId: "316700975498",
  appId: "1:316700975498:web:15063159b205c1a349a873",
  measurementId: "G-2ZGE63ES9F",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
