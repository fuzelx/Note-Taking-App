

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, update, ref }  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification }  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const db = getDatabase();
const auth = getAuth(app);

let email = document.getElementById('email');
let password = document.getElementById('password');
let name = document.getElementById('name');
let form = document.getElementById('signup-form')


let registerUser = evt =>{
    evt.preventDefault();


    let userName = name.value;

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((credentials) => {
        const userUid = credentials.user.uid;

        // Send email verification
        return sendEmailVerification(auth.currentUser);
    })
    .then(() => {
        // Update user profile data
        return update(ref(db, 'UserAuthList/' + auth.currentUser.uid), {
            fullname: userName,
        });
    })
    .then(() => {
        alert('Account created successfully! Please check your email for verification.');
        window.location.href = 'index.html';
    })

    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

form.addEventListener('submit', registerUser)
