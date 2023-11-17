import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBJLZz75ZlhYPfOQlXcMX_1khTfu0fSgko",
    authDomain: "swiftlymobile-f7f42.firebaseapp.com",
    projectId: "swiftlymobile-f7f42",
    storageBucket: "swiftlymobile-f7f42.appspot.com",
    messagingSenderId: "729717444778",
    appId: "1:729717444778:web:4a398e550f0008096d80d3",
    measurementId: "G-G89DL2SLGD"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };