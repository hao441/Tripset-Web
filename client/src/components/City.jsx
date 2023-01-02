import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import autocomplete from '../autoComplete.js'
import cities from '../listOfCities.json'
import countryLookUp from  '../countryLookUp.json';
import cityLookup from '../cityLookUp.json'

//Redux
import { selectSessionToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

//css
import '../App.css'
import './css/city.css';

export default function City() {
    
    //redux selector
    const sessionToken = useSelector(selectSessionToken);

    //use states
    const [message, setMessage] = useState('');
    const [toTrip, setToTrip] = useState(false);
    const [count, setCount] = useState(0);


    useEffect(() => {
        autocomplete(document.getElementById("myInput"), cities);
    })
    

    const userCity = (e) => {
        e.preventDefault();
        let city = document.getElementById('myInput').value

        if (cityLookup[city] == null) return setMessage('Please select an option.')
        
        fetch('http://localhost:9000/usercity', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken, "city": city})
            })
            .then(res => res.json)
            .then(res => {
                if (!res.result) return 'Error setting city in db.'

                return setToTrip(true)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="page">
            {toTrip && <Navigate replace to="/trip" />}
            <div className='formContainer'>
                <div id='title'>
                    <h1>Welcome</h1>
                </div>
                <div id='cityForm'>
                    <h3>Where are you from?</h3>
                    <form autoComplete="off" onSubmit={userCity}>
                        <div className="autocomplete">
                        <input id="myInput" type="text" name="myCountry" placeholder="Country" required />
                        </div>
                        <input type="submit" />
                        </form>
                        <h5>{message}</h5>
                </div>
            </div>
        </div>
    )
} 