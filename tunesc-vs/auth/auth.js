function signinGoogle() {
    console.log("signIn function called");
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // possible error to since 'create', not get, search mo later
    let form = document.createElement('form')
    form.setAttribute('method','GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
        "client_id": "704828108961-a0g1u5hghgeqho7edq1c8l644e8jf11a.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:5500/UserProfile.html", //where to redirect after auth/login
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile", //space inside the link adds more scopes
        "include_granted_scopes": "true",
        'state': "pass-through-value"
    }

    for (var p in params) {
        let input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}

function signoutGoogle() {
}


function registerWithMail() {
    // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase()
      const auth = getAuth(app)

      let DispnameInp = document.getElementById('name-signup')
      let EmailInp = document.getElementById('email-signup')
      let PassInp = document.getElementById('password-signup')
      let PassConfirmInp = document.getElementById('passwordConf-signup')
      let RegisForm = document.getElementById('RegisForm')

      let RegisterUser = evt => {
        evt.preventDefault();

        createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
        .then((credentials) => {
          //rest of the info will be put into the realtime database
          // console.log(credentials)
          set(ref(db,'UsersAuthList/' + credentials.user.uid), {
            name: DispnameInp.value,
          })
        })
        .catch ((error) => {
          //show error, refactor this later to a pop up
          alert(error.message);
          console.log(error.code)
          console.log(error.message)
        })
      }

      RegisForm.addEventListener('submit', RegisterUser)
}
