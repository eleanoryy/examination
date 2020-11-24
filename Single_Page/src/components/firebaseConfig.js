// import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCOEchXlayV8xuU_-pHCZ-1ZQonXUIBnRU",
    authDomain: "react-interview-b6875.firebaseapp.com",
    databaseURL: "https://react-interview-b6875.firebaseio.com",
    projectId: "react-interview-b6875",
    storageBucket: "react-interview-b6875.appspot.com",
    messagingSenderId: "129597455367",
    appId: "1:129597455367:web:cad7c7fe289248bd4a3ea2",
    measurementId: "G-HM522WHS9W"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
// const database = firebase.database();


// export const firebaseConfig;
// export const database;
export default firebaseApp;



  // Your web app's Firebase configuration
  
  // Initialize Firebase

