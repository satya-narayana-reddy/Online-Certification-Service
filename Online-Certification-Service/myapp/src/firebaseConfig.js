import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVZuaNkmfDND475I96NT7pqftaZR6r2QY",
  authDomain: "login-authentication-61f8a.firebaseapp.com",
  projectId: "login-authentication-61f8a",
  storageBucket: "login-authentication-61f8a.appspot.com",
  messagingSenderId: "998380139384",
  appId: "1:998380139384:web:8f37502aa66c23131d4e8d",
  measurementId: "G-XEV9F15CSL"
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const ProjectAuth = firebase.auth();
export default ProjectAuth ;
export const database = getFirestore(app)
