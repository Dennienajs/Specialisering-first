import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCIhtPFWgKUYJXJR8fN1JZyRn2t6REgrcg",
  authDomain: "specialisering-c1932.firebaseapp.com",
  databaseURL: "https://specialisering-c1932.firebaseio.com",
  projectId: "specialisering-c1932",
  storageBucket: "specialisering-c1932.appspot.com",
  messagingSenderId: "208626584271",
  appId: "1:208626584271:web:4b08dccc1fe10f8d2485ba"
});

export { firebaseConfig as firebase };

/*
https://firebase.google.com/docs/firestore
https://console.firebase.google.com/project/specialisering-c1932/settings/general/
*/
