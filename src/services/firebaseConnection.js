import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyBhDIGHiVDQEoeU126MNTTPEkZih4h4RcM",
  authDomain: "post2b-4db33.firebaseapp.com",
  projectId: "post2b-4db33",
  storageBucket: "post2b-4db33.appspot.com",
  messagingSenderId: "247243166219",
  appId: "1:247243166219:web:965f5d479d9e7d5d522d0e",
  measurementId: "G-6D8X9MLHQM"
};
// Initialize Firebase
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;