import { Navigate, redirect,  } from "react-router";
import { login } from "./features/auth/authSlice";
import { store } from "./app/store";



export async function sessionData() {
    const sessionJWT = store.getState().auth.sessionToken
    const sessionJWTExpiry = store.getState().auth.sessionTokenExpiry

    if (sessionJWT === '' || sessionJWTExpiry === '') {
        store.dispatch(login({loggedIn: false, token: '', tokenExpiry: '', username: ''}))
        return redirect('signup')
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


    console.log(`store state: ${store.getState().auth.loggedIn}`)
}