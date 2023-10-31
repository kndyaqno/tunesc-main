import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
//set and ref is used to save data to db
//get and child is for login
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
//createUserWithEmailAndPassword name explains itself
//signInWithEmailAndPassword name explains itself
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

//set to global variables

const firebaseConfig = {
    apiKey: "AIzaSyDZ2X6a_hSxKdTbbj20WTztJx1YGv8q5k8",
    authDomain: "tunesc-25041.firebaseapp.com",
    databaseURL: "https://tunesc-25041-default-rtdb.firebaseio.com",
    projectId: "tunesc-25041",
    storageBucket: "tunesc-25041.appspot.com",
    messagingSenderId: "78861021693",
    appId: "1:78861021693:web:21177637753316c7b72994",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase()
  const auth = getAuth(app)

    //for signin
  const dbref = ref(db);

//sign up
    let DispnameInp = document.getElementById('name-signup')
    let EmailInp = document.getElementById('email-signup')
    let PassInp = document.getElementById('password-signup')
    let PassConfirmInp = document.getElementById('passwordConf-signup')
    let RegisForm = document.getElementById('RegisForm')


//login

    let EmailLogInp = document.getElementById('email-login')
    let PassLogInp = document.getElementById('password-login')
    let LoginForm = document.getElementById('LoginForm')

export function RegisterUser(evt) {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      //rest of the info will be put into the realtime database
      console.log(credentials)
    })
    .catch ((error) => {
      //show error, refactor this later in a pop-up form
      alert(error.message);
      console.log(error.code)
      console.log(error.message)
    });
  }

export  function LoginUser(evt) {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, EmailLogInp.value, PassLogInp.value)
        .then((credentials) => {
            //rest of the info will be put into the realtime database
            console.log(credentials)
        })
        .catch ((error) => {
            //show error, refactor this later in a pop-up form
            alert(error.message);
            console.log(error.code)
            console.log(error.message)
        });
    }

// add to button nalang
// RegisForm.addEventListener('submit', RegisterUser)
// LoginForm.addEventListener('submit', LoginUser)
