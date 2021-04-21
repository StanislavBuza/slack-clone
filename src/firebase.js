import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAO3MVl2FB8MTyxAaj9lS3nUfwOSsSxDP0",
    authDomain: "slack-clone-67c8f.firebaseapp.com",
    projectId: "slack-clone-67c8f",
    storageBucket: "slack-clone-67c8f.appspot.com",
    messagingSenderId: "104816238697",
    appId: "1:104816238697:web:22c8eefdb6a763f6b382f8",
    measurementId: "G-ZPJQ7H4G4X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, db, provider};