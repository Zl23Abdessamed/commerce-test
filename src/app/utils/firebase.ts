// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-iQjP22zBcGO0YY-8j_P5Roc_Uzwo4tk",
    authDomain: "test-commerce-af075.firebaseapp.com",
    projectId: "test-commerce-af075",
    storageBucket: "test-commerce-af075.firebasestorage.app",
    messagingSenderId: "186945006205",
    appId: "1:186945006205:web:cf8355e0b24a6251e01f14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


