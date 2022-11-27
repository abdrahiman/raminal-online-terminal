import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk88WmlK60NqEgPi7oomuj2G9YsKTyS-k",
  authDomain: "test-9ccb4.firebaseapp.com",
  projectId: "test-9ccb4",
  storageBucket: "test-9ccb4.appspot.com",
  messagingSenderId: "904003320931",
  appId: "1:904003320931:web:6fd6332b9d414933df8c56",
  measurementId: "G-SZQVX7R9QS",
};

// Initialize Firebase

initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
let auth = getAuth(app);

let addAcc = async (e, p) => {
  let mes = "";
  await createUserWithEmailAndPassword(auth, e, p)
    .then((u) => (mes = `${e.split("@")[0]} , you have created an account ...`))
    .catch((error) => (mes = error.message));
  await updateProfile(auth.currentUser, { displayName: e.split("@")[0] });
  return mes;
};
let googleMe = async () => {
  auth.languageCode = "it";
  let mes = "";
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      mes = `${result.user.displayName},you have logged in with google ...`;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      mes = "⚠️" + errorMessage;
    });
  return mes;
};
let LoginAcc = async (e, p) => {
  let mes = "";
  await signInWithEmailAndPassword(auth, e, p)
    .then((u) => (mes = `${u.user.displayName},you have logged in ...`))
    .catch((error) => (mes = error.message));
  return mes;
};

export { app, auth, addAcc, LoginAcc, googleMe };
