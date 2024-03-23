
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyC8BeW1pI6cX1eglSGqkqTgA1M9ly8BIQ8",
  authDomain: "jewellery-shop-aab07.firebaseapp.com",
  projectId: "jewellery-shop-aab07",
  storageBucket: "jewellery-shop-aab07.appspot.com",
  messagingSenderId: "652748910652",
  appId: "1:652748910652:web:cfcb96b2d1280f7ad2d339"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Users = db.collection("Users");

module.exports = {
    Users
}
