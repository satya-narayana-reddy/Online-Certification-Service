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
let app = null;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
   app = firebase.app(); 
}


const ProjectAuth = firebase.auth();
export const database = getFirestore(app)
export default ProjectAuth ;