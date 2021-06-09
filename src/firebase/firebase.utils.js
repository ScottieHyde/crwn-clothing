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
  const collectionRef = firestore.collection('users')
  const snapShot = await userRef.get()
  // the above snapShot object gives us a few details
  // exists property - tells us if there is any data for this user
  // id property - tells us the id of the same document
  // metadata property - gives us certain information like when it was created, if it is cached, if it has any pending writes

  const collectionSnapshot = await collectionRef.get();
  // this snapshot gives us an object with properties like docs/empty/size/etc
  // inside docs it will give us snapshots in an array of the users collection
  // empty tells us if the query is empty or not
  // size tells us how many objects are inside the collection

  // to get the data for each snapshot document - data() gives us a JSON representation of the data on these documents
  collectionSnapshot.docs.map(doc => doc.data())

  if (!snapShot.exists) {
    const { displayName, email } = userAuth; // pull properties from userAuth object
    const createdAt = new Date(); // create a new date object so we know with this person was created

    try {
      await userRef.set({ // create new user since they did not exist
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

// only used once to add the shop data to firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch() // allows us to batch all the data being set so if anything fails the whole call fails
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc() // tells firebase to give me a new document reference in this collection and randomly generate an id
    batch.set(newDocRef, obj) // add the newDocRef to the batch and set it to the object
  })
  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()), //encodeURI - pass a string to it and it and it will return a new string that any URL cannot handle or process
      id: doc.id, // the id it on the doc itself
      title,
      items,
    }
  })
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; // set the object key to the title and the value to the collection
    return accumulator
  }, {}) // {} is the initial object
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
