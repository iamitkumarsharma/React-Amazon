import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD3hMygqF3nystTPUE3IxBuaYqpN9AdY7I",
  authDomain: "react--clone-edc26.firebaseapp.com",
  projectId: "react--clone-edc26",
  storageBucket: "react--clone-edc26.appspot.com",
  messagingSenderId: "859859441338",
  appId: "1:859859441338:web:10690b8890dabf8db45483",
  measurementId: "G-CP4NKCFDP5",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
