import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBgJdeDgMMbaA323UaJDPyE1i9EsbCUO4k",
    authDomain: "shopper-helper-project.firebaseapp.com",
    projectId: "shopper-helper-project",
    storageBucket: "shopper-helper-project.appspot.com",
    messagingSenderId: "694847745443",
    appId: "1:694847745443:web:c6816d1f60f938411e7e16",
    measurementId: "G-X3EX7P4PSJ"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore();