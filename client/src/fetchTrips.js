//imports
import { store } from "./app/store"

//redux
const username = store.getState().auth.username


//fetch requests

    //Find Itinerary
    const findItinerary =  (trip) => {

        if (username === '') return console.log('No user is logged in.')
        
        let result = fetch('http://localhost:9000/finditinerary', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"username": username, "trip": trip})
            })
            .then(res => res.json())
            .then(res => {return [res.result, res.code]})
            .catch(error => {return "hi"})

        return result
    }

    //Trip Find
    // const tripFind =  () => {

    //     if (username === '') return console.log('No user is logged in.')
        
    //     let result = fetch('http://localhost:9000/finditinerary', {
    //         method: 'POST',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({"username": username})
    //         })
    //         .then(res => res.json())
    //         .then(res => {console.log(res);  return res.result})
    //         .catch(error => {return "hi"})

    //     return result
    // }

    

export {findItinerary}