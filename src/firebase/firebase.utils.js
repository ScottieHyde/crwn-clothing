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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // query reference - is an object that represents the "current" place in the database that we are querying
  // DocumentReference vs CollectionReference
  // We use the doc ref objects to perform our CRUD methods
  // We can also add documents to the collections using the collectionRef object using .add()
  // We get the snapshotObject from the referneceObject using the .get() method i.e. documentRef.get() or collectionRef.get()
  // documentRef returns a documentSnapshot object and collectionRef returns a querySnapshot object

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  // the above snapShot object gives us a few details
  // exists property - tells us if there is any data for this user
  // id property - tells us the id of the same document
  // metadata property - gives us certain information like when it was created, if it is cached, if it has any pending writes

  if (!snapShot.exists) {
    const { displayName, email } = userAuth; // pull properties from userAuth object
    const createdAt = new Date(); // create a new date object so we know with this person was created

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
