import firebase from "firebase";

const firebaseApp= firebase.initializeApp({
  apiKey: "AIzaSyB_4h0w0swLtYZf3ZaXD3zLNzDibv9Gr9Q",
  authDomain: "clone-3eed1.firebaseapp.com",
  databaseURL: "https://clone-3eed1.firebaseio.com",
  projectId: "clone-3eed1",
  storageBucket: "clone-3eed1.appspot.com",
  messagingSenderId: "438776531618",
  appId: "1:438776531618:web:93effda6f56969d183a5fb",
  measurementId: "G-PS42ETFCH7"
});



  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  export {db, auth};