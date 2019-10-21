import firebase from "firebase/app";
import "firebase/firestore";

// Cleared for github
const firebaseConfig = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

export { firebaseConfig as firebase };

/*
https://firebase.google.com/docs/firestore
https://console.firebase.google.com/project/specialisering-c1932/settings/general/
*/
