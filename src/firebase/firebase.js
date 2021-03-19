import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDhW0l7UBeoaR-YY34mVC2TjOCCoav9Mew",
    authDomain: "boka-padel.firebaseapp.com",
    projectId: "boka-padel",
    storageBucket: "boka-padel.appspot.com",
    messagingSenderId: "665201598318",
    appId: "1:665201598318:web:2c0c11ae3fbfad6ac1ab7f",
    measurementId: "G-TQQBHTL55P"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const db = firebase.firestore();

const storage = firebase.storage();

export { db, storage, auth, firebase as default }