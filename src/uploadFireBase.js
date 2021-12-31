import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfnuAbAbEwfDUaQZ9M0yz7gKAvgfwppqI",
  authDomain: "anonymous-1937.firebaseapp.com",
  projectId: "anonymous-1937",
  storageBucket: "anonymous-1937.appspot.com",
  messagingSenderId: "1052540823760",
  appId: "1:1052540823760:web:6b636f2e4870b0d97416d5",
  measurementId: "G-5QCCS7XD2C"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };