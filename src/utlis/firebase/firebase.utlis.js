import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0Jto6fu5tORIXYGuxfdpUrOus10YprPo",
  authDomain: "crown-db-434f4.firebaseapp.com",
  projectId: "crown-db-434f4",
  storageBucket: "crown-db-434f4.appspot.com",
  messagingSenderId: "741848442359",
  appId: "1:741848442359:web:af349905147d8fa477baf2",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);

  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};
