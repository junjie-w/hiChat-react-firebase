// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCyza_5Q3ir7ZYHJYvwzQJYLFCCcZragRY",
  authDomain: "junjie-wu-hichat.firebaseapp.com",
  databaseURL: "https://junjie-wu-hichat.firebaseio.com",
  projectId: "junjie-wu-hichat",
  storageBucket: "junjie-wu-hichat.appspot.com",
  messagingSenderId: "140399585639",
  appId: "1:140399585639:web:a04ee552b7c369e1c867c2",
  measurementId: "G-10RSWLND5B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;