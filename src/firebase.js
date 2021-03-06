import {initializeApp} from "firebase/app";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    sendEmailVerification,
    updateEmail,
    updatePassword,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    doc,
    getDoc,
    data,
    updateDoc,
} from "firebase/firestore";

import { 
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    uploadBytes
} from "firebase/storage"

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
const storage = getStorage(app); //storage

const metadata = {
    contentType: "image/jpeg",
};

// uploading profile picture
const uploadProfilePicture = (file, uid) => {
    // const file = document.getElementById("uploadJPG").src
    if (!file) {
        return;
    }
    const blob = new Blob([file], {type: "image/jpeg"})
    console.log(file);
    const storageRef = ref(storage,"users/" + uid + ".jpg")
    // console.log(file[0].size);
    const d = doc(db, "users", uid);
    console.log(blob.size);
    uploadBytes(storageRef, blob, metadata).then((ss) => {
        getDownloadURL(ss.ref).then(async(downloadURL) => {
            updateDoc(d, {
                photoURL: downloadURL
            }).then(() => console.log(downloadURL))
        })
    })
}

// Login
const logInWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerLawyer = async(firstName, lastName, company, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const fullName = firstName + " " + lastName;
        await setDoc(doc(db, "users", user.uid.toString()), {
            lawyer: true,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/get-law.appspot.com/o/default.png?alt=media&token=ad35be0d-a69b-4212-9ffa-6230450652dd",
            fullName,
            authProvider: "local",
            email,
            company,
            bio: "",
            uid: user.uid,
            expertise: [
                {type: "Alternative Dispute Resolution", bool: false},
                {type: "Building & Construction", bool: false},
                {type: "Civil", bool: false},
                {type: "Conveyancing", bool: false},
                {type: "Corporate", bool: false},
                {type: "Criminal Law", bool: false},
                {type: "Cybersecutity & Data Protection", bool: false},
                {type: "Family Law", bool: false},
                {type: "Intellectual Property", bool: false},
                {type: "Family Law", bool: false},
                {type: "Insolvency", bool: false},
                {type: "Muslim Law", bool: false},
                {type: "Personal Injury & Property Damage", bool: false},
                {type: "Probate & Succession Planning", bool: false},
        ],
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerClient = async(firstName, lastName, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const fullName = firstName + " " + lastName;
        await setDoc(doc(db, "users", user.uid.toString()), {
            lawyer: false,
            fullName,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const updateExpertiseList = async(records, uid) => {
    const d = doc(db, "users", uid)
    await updateDoc(d, {
        expertise: records,
    })
    return true; 
}

const updateCompanyAndBio = async(company = "", bio = "", uid) => {
    const d = doc(db, "users", uid)
    if (company === "" && bio === "") {
        console.log("nothing")
        console.alert("Please enter details!")
        return;
    }
    if (company !== "" && bio !== "") {
        const res = await updateDoc(d, {
            company: company,
            bio: bio,                
        })
        return true;
    } else if (company !== "") {
        const res = await updateDoc(d, {company: company});
        return true;
    } else if (bio !== "") {
        const res = await updateDoc(d, {bio: bio});
        return true;
    } 
}

const updateEmailDocs = async(email, uid) => {
    const d = doc(db, "users", uid) 
    await updateDoc(d, {
        email: email,
    })
}

async function getUserInfo(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const result = docSnap.data();
        return result;
    } else {
        console.log("None")
    }
}

const getLawyerExpertise = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().expertise;
    } else {
        console.log("None");
    }
}

async function getLawyers() {
    const lawyerRef = collection(db, "users");
    const q = query(lawyerRef, where("lawyer", "==", true));
    let result = []
    const snap = await getDocs(q);
    snap.forEach((x) => {
        result.push(x.data());
    })
    return result;
}

// Password reset
const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Reset email has been sent")
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
    app,
    db,
    sendPasswordReset,
    logInWithEmailAndPassword,
    logout,
    registerLawyer,
    registerClient,
    getUserInfo,
    getLawyers,
    updateCompanyAndBio,
    updateEmailDocs,
    uploadProfilePicture,
    updateExpertiseList,
    getLawyerExpertise,
};
