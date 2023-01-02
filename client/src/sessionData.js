import { Navigate, redirect } from "react-router";
import { login } from "./features/auth/authSlice";
    
export let loginToken = document.cookie === '' ? '' : document.cookie.match(/token=(\S+)/)[0].replace('token=','');

export async function sessionData() {

    if (loginToken === '') return false && console.log('token is empty.')

    console.log(loginToken)

    await fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": loginToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                    return true
                } else {
                    console.log('User not logged in.')
                    return false;
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            });
}