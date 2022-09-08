// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOGfi-v-OHRB3MAxNp2gLt7E2mmUW4dos",
  authDomain: "uber-food-b2f4f.firebaseapp.com",
  projectId: "uber-food-b2f4f",
  storageBucket: "uber-food-b2f4f.appspot.com",
  messagingSenderId: "1081706539814",
  appId: "1:1081706539814:web:0bb1f79ad93abe9302efe7",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
