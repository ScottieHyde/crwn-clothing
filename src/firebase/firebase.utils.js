import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA3Xk_euwMMWyFnXcXY5ouLi-A500mCUpE",
    authDomain: "crown-db-45cdf.firebaseapp.com",
    projectId: "crown-db-45cdf",
    storageBucket: "crown-db-45cdf.appspot.com",
    messagingSenderId: "376446073992",
    appId: "1:376446073992:web:7bcdcadb21bf4d62bb733d",
    measurementId: "G-TEMDRQJENP"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
