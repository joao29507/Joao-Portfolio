  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
  import { getFirestore} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD6mYuP_QA3t9XhIUTvqua-kBtfd4w2sHc",
    authDomain: "potfolio-8fa04.firebaseapp.com",
    projectId: "potfolio-8fa04",
    storageBucket: "potfolio-8fa04.firebasestorage.app",
    messagingSenderId: "983594194306",
    appId: "1:983594194306:web:01041b4f753ab419c42b9b",
    measurementId: "G-F3TN750TDH"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
