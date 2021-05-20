//import firebase from 'firebase/app'
import 'firebase/storage'
import firebase from 'firebase/app'

import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyADHINzjak6cKstx__jyT3SH3moF-EwuRY",
    authDomain: "react-proyect-gadd.firebaseapp.com",
    projectId: "react-proyect-gadd",
    storageBucket: "react-proyect-gadd.appspot.com",
    messagingSenderId: "207185571575",
    appId: "1:207185571575:web:f5e496bf3876778d4badf2",
    measurementId: "G-1V2QQJKV5C"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage()

//export default firebase.firestore();
var firebase1 = firebase.firestore();

export  {
    storage, firebase1 as default
}