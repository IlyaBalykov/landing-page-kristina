export function getAuthForm() {
    return `
     <form id="auth-form" class="modal__auth-form auth-form" action="">
       <label class="auth-form__email-title" for="auth-form__email">E-mail</label>
       <input id="auth-form__email" class="auth-form__email-input" type="email" placeholder="type e-mail" required>
       <label class="auth-form__password-title" for="auth-form__password">Password</label>
       <input id="auth-form__password" class="auth-form__password-input" type="password" placeholder="type password" required>
       <button class="auth-form__login-btn" type="submit">Log in</button>
     </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyDu9f4FYbcnOQlLrgo2gKUdYdPreztll0w';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(response => response.json())
      .then(data => data.idToken) //and get id token in authFormHandler as "token" (as promise)
}