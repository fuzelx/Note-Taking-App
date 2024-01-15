require('dotenv').config();

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

let email = document.getElementById('email');
let password = document.getElementById('password');
let name = document.getElementById('name');
let form = document.getElementById('signup-form')

let signInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((credentials) => {
            const userRef = child(dbref, 'UserAuthList/' + credentials.user.uid);

            // Use 'get' function to retrieve data from the reference
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        fullname: snapshot.val().fullname
                    }));
                    sessionStorage.setItem("user-cred", JSON.stringify(credentials.user));
                    window.location.href = 'index.html';
                }
            });
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}

form.addEventListener('submit', signInUser);
