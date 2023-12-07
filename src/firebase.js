// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbZerPqGwbqGcdHZif60KHSmzC1BYzhOg",
  authDomain: "my-quiz-24cc4.firebaseapp.com",
  projectId: "my-quiz-24cc4",
  storageBucket: "my-quiz-24cc4.appspot.com",
  messagingSenderId: "477305048303",
  appId: "1:477305048303:web:25e06c27e8cee17d9b9f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

// Initialize firebase Authentication and get a reference to the service
// export const auth = getAuth(app);