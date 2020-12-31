import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD6lXyqCOExgSxetTHhBUKzMgK01nstkq4",
  authDomain: "letssurvey-6f138.firebaseapp.com",
  projectId: "letssurvey-6f138",
  storageBucket: "letssurvey-6f138.appspot.com",
  messagingSenderId: "674754833076",
  appId: "1:674754833076:web:d22059578adf44a847c5e1",
  measurementId: "G-5XN1CBS02P"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;