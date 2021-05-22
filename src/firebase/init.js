import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBgJdeDgMMbaA323UaJDPyE1i9EsbCUO4k",
    authDomain: "shopper-helper-project.firebaseapp.com",
    projectId: "shopper-helper-project",
    storageBucket: "shopper-helper-project.appspot.com",
    messagingSenderId: "694847745443",
    appId: "1:694847745443:web:c6816d1f60f938411e7e16",
    measurementId: "G-X3EX7P4PSJ"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }else{
    firebase.app()
  }

  const fireAuth = firebase.auth();
  const fireDatabase = firebase.firestore()
  
  // firebase.analytics();

  //export default firebaseApp.firestore();

  export { fireAuth, fireDatabase }