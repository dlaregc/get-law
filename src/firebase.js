import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import {initializeApp} from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    sendEmailVerification,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMIAN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); //authentication
const db = getFirestore(app); //database

// Login
const logInWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerLawyer = async(firstName, lastName, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const fullName = firstName + " " + lastName;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            fullName,
            authProvider: "local",
            email
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Registering
const registerWithEmailAndPassword = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Password reset
const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Logout
const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logInWithEmailAndPassword,
    logout,
    registerLawyer,
};

export default app;