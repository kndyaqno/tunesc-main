function signin() {
    console.log("signIn function called");
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // possible error to since 'create', not get, search mo later
    let form = document.createElement('form')
    form.setAttribute('method','GET')
    form.setAttribute('action', oauth2Endpoint)

    let params = {
        "client_id": "704828108961-a0g1u5hghgeqho7edq1c8l644e8jf11a.apps.googleusercontent.com",
        "redirect_uri": "http://127.0.0.1:5500/userProfile.html", //where to go after auth
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