import Firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbk9MeDkgqQOieN3RwUxO7Z3w2xTrGzbc",
    authDomain: "todoapp-51216.firebaseapp.com",
    projectId: "todoapp-51216",
    storageBucket: "todoapp-51216.appspot.com",
    messagingSenderId: "976657770368",
    appId: "1:976657770368:web:04cbb5b9850bf9e2d24365"
  };
  Firebase.initializeApp(firebaseConfig);

const db = Firebase.firestore();
export { db };