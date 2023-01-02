import { sessionData } from "../../sessionData";

// let loginToken = document.cookie.match(/loginToken=([^;]+)/)[1];

// A mock function to mimic making an async request for data
export function fetchLogin() {
  return new Promise((resolve) => {
    sessionData() ? resolve({ loggedIn: true }) : resolve({ loggedIn: false });
  })
}

// export function getSession() {
//   return new Promise((resolve) => {
//     fetch('http://localhost:9000/findtrips', {
//                 method: 'POST',
//                 headers: {'Content-Type':'application/json'},
//                 body: JSON.stringify({"token": loginToken})
//                 })
//                 .then(res => res.json())
//                 .then(res => {
//                     console.log(res.result)
//                     if (res.result) {
//                         setTrips([...res.trips]);
//                         console.log(trips[0])
//                     } else {
//                         console.log('No trips.')
//                         console.log(res.message)
//                     }
//                 })
//                 .catch(error => {console.log(error)
//                 })
//   })
// }
  