

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDfCQQgNYDMEdZGvnR0Udr4LPF42IJc16g",
    authDomain: "notes-app-b6d5d.firebaseapp.com",
    databaseURL: "https://notes-app-b6d5d-default-rtdb.firebaseio.com",
    projectId: "notes-app-b6d5d",
    storageBucket: "notes-app-b6d5d.appspot.com",
    messagingSenderId: "288599577112",
    appId: "1:288599577112:web:b86d96f5f30dd5c132e96d",
    measurementId: "G-2S09PHH330"
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
                    window.location.href = 'home.html';
                }
            });
        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}

let handleKeyPress = evt => {
    // Check if the Enter key (key code 13) is pressed
    if (evt.key === 'Enter') {
        signInUser(evt);
    }
}

// Add a key event listener to the form
form.addEventListener('submit', signInUser);

// Add a key event listener to handle the Enter key press
form.addEventListener('keypress', handleKeyPress);