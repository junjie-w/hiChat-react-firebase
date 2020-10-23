// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBQHfsQkulMp024c4wHsPWgOZeeRSBGXhY",
  authDomain: "hichat-react-96310.firebaseapp.com",
  databaseURL: "https://hichat-react-96310.firebaseio.com",
  projectId: "hichat-react-96310",
  storageBucket: "hichat-react-96310.appspot.com",
  messagingSenderId: "835393066059",
  appId: "1:835393066059:web:eaadebc6a0df8d389de9ce",
  measurementId: "G-Y0QX7C33CT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;