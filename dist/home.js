require('dotenv').config();

let userCred = JSON.parse(sessionStorage.getItem("user-cred"));
let userInfo = JSON.parse(sessionStorage.getItem("user-info"));

let msgHead = document.getElementById('msg');
let greetHead = document.getElementById('greet');
let signoutBtn = document.getElementById('logout');

console.log(userInfo.fullname);

msgHead.innerHTML = `User with email"${userCred.email}" Logged in.`;
greetHead.innerHTML = `Welcome ${userInfo.fullname}`;

let signout = () => {
    sessionStorage.removeItem("user-cred");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html'
};

let checkCred = () => {
    if (!sessionStorage.getItem("user-cred"))
        window.location.href = 'index.html'
};


window.addEventListener('load', checkCred);
signoutBtn.addEventListener('click', signout)
