import { initializeApp } from "firebase/app";
import { getAuth ,signInWithPopup , GoogleAuthProvider , signOut  , FacebookAuthProvider  }
from "firebase/auth"

export const firebaseConfig = {
    apiKey: "AIzaSyCe6_Ulk0UZoJp23UPti1TOJpSHwKUiWOc",
    authDomain: "ecommerce-50bbb.firebaseapp.com",
    projectId: "ecommerce-50bbb",
    storageBucket: "ecommerce-50bbb.appspot.com",
    messagingSenderId: "422913168401",
    appId: "1:422913168401:web:26cff9537a81dde17ecdb0",
    measurementId: "G-Z37YQRHD48"
};

initializeApp(firebaseConfig)

export const firebaseApp = initializeApp

export const auth = getAuth()
export const SignOut = signOut

// sign up pop up
export const SignInWithPopup = signInWithPopup

// Providers
export const providers = {
    google : new GoogleAuthProvider() ,
    facebook : new FacebookAuthProvider() 
}
