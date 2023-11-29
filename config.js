import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBJLZz75ZlhYPfOQlXcMX_1khTfu0fSgko",
    authDomain: "swiftlymobile-f7f42.firebaseapp.com",
    projectId: "swiftlymobile-f7f42",
    storageBucket: "swiftlymobile-f7f42.appspot.com",
    messagingSenderId: "729717444778",
    appId: "1:729717444778:web:4a398e550f0008096d80d3",
    measurementId: "G-G89DL2SLGD"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);

export default app;