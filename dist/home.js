

let userCred = JSON.parse(localStorage.getItem("user-cred"));
let userInfo = JSON.parse(localStorage.getItem("user-info"));

let msgHead = document.getElementById('msg');
let greetHead = document.getElementById('greet');
let signoutBtn = document.getElementById('logout');

console.log(userInfo.fullname);

let nav_user = document.getElementById('acc-user');
nav_user.innerHTML =userInfo.fullname;

var morningStart = 6;
var afternoonStart = 12;
var nightStart = 18;



let currentHour = new Date().getHours();
if(currentHour  >= morningStart && currentHour < afternoonStart){
msgHead.innerText= `Good Morning🌄! ${userInfo.fullname}`
} else if(currentHour >= afternoonStart && currentHour < nightStart ){
    msgHead.innerText= `Good Afternoon🌞! ${userInfo.fullname}`
} else{
    msgHead.innerText= `Good Night🌃! ${userInfo.fullname}`
}

greetHead.innerHTML = `Welcome ${userInfo.fullname}`;

let dateElement = document.getElementById('date');
let timeElement = document.getElementById('time');

const popup = ()=>{



inputBox.classList.remove('hidden');

openBtn.classList.add('hidden')

closepop.classList.remove('hidden')

}
let openBtn = document.getElementById('pop-new-btn');
let inputBox = document.getElementById('inputBox');
let closepop = document.getElementById('pop-close-btn');

const closePop = ()=>{
    inputBox.classList.add('hidden');
    closepop.classList.add('hidden');
    openBtn.classList.remove('hidden');
}

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the current day of the week
var today = new Date();
var dayOfWeek = today.getDay();

let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();


dateElement.innerText =daysOfWeek[dayOfWeek];
timeElement.innerText =`${day}/${month}/${year}`;


let signout = () => {
    localStorage.removeItem("user-cred");
    localStorage.removeItem("user-info");
    window.location.href = 'index.html'
};

let checkCred = () => {
    if (!localStorage.getItem("user-cred"))
        window.location.href = 'index.html'
};


window.addEventListener('load', checkCred);
signoutBtn.addEventListener('click', signout)
