import { Navigate, redirect, useNavigate  } from "react-router";
import { login } from "./features/auth/authSlice";
import { store } from "./app/store";

export async function sessionData() {
    const sessionJWT = document.cookie == '' ? '' : document.cookie.match(/token=([^;]+)/)[1]
    const sessionJWTExpiry = document.cookie == '' ? '' : document.cookie.match(/expires=([^;]+)/)[1]
    const sessionUsername = document.cookie == '' ? '' : document.cookie.match(/username=([^;]+)/)[1]

    if (sessionJWT === '' || sessionJWTExpiry === '') {
        store.dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: ''}))
        return ('signup')
    }

    await fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionJWT})
            })
            .then(res => res.json())
            .then (res => {
                store.dispatch(login({loggedIn: res.result, token: res.token, tokenExpiry: sessionJWTExpiry, username: res.username}))
                return redirect('signup')    
            })
            .catch(err => {
                store.dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: ''}))
                return redirect('signup')
            });
}