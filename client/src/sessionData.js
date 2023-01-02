import { Navigate } from "react-router";

    
export let token = document.cookie === '' ? '' : document.cookie.match(/(?:[^token]).+?(?=;)/)[0].replace('=','');

export function sessionData() {
    if (token == '') return false

    fetch('http://localhost:9000/verifyuser', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"token": token})
        })
        .then(res => res.json())
        .then (res => {
            if (res.result) {
                console.log('User is logged in.')
                return true
            } else {
                console.log('User is not logged in.')
                return false
            }
        })
        .catch(err => {
            console.log(err)
            return false
        });
}