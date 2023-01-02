import { redirect } from "react-router-dom";
import { sessionData } from "./sessionData";

export const loader = async () => {
    let loginToken = document.cookie === '' ? '' : document.cookie.match(/token=(\S+)/)[0].replace('token=','');

    if (loginToken === '') return false && console.log('token is empty.')

    let user = await fetch('http://localhost:9000/verifyuser', {
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

  console.log(user)
  !user && redirect('/welcome')
  if (!user) {
    return redirect('/welcome')
  }
};