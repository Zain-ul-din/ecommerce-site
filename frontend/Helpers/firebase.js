import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import { cookieName } from "./constants";
import Router from "next/router";
import firebaseConfig from "../firebase_key";

export const firebaseConfig = firebaseConfig; // add your firebase config here

initializeApp(firebaseConfig);

export const firebaseApp = initializeApp;

export const auth = getAuth();
export const SignOut = signOut;

// sign up pop up
export const SignInWithPopup = signInWithPopup;

// Providers
export const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export const SignOutUser = (canReload = true) => {
  signOut(getAuth());
  document.cookie = cookieName + "=; Max-Age=-99999999;";
  if (canReload) Router.push("/");
};
