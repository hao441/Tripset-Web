import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import autocomplete from '../autoComplete.js'
import cities from '../listOfCities2.json'
import countryLookUp from  '../countryLookUp.json';
import cityLookup from '../cityLookUp.json'

//Redux
import { selectSessionToken, selectUserName } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

//css
import '../App.css'
import './css/city.css';

export default function City() {

    //react router
    const navigate = useNavigate()
    
    //redux selector
    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName);

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

        let cityString = city.match(/.+(?=,)/)[0]
        let countryString = city.match(/(?=, ).+(?=\W\W\W\W\W)/)[0].replace(', ', '')

        if (cityLookup[cityString] == null) return setMessage('Please select an option.')
        
        fetch('http://localhost:9000/usercity', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": sessionUsername, "city": cityString, "country": countryString, "lat": cityLookup[cityString].lat, "lng": cityLookup[cityString].lng})
            })
            .then(res => res.json())
            .then (res => { res.result == true && navigate('/trip')})
            .catch(error => console.log(error))
    }

    if (toTrip) {return <Navigate replace to='/trip' />}

    return (
        <div className="page">
            {toTrip && <Navigate replace to={`/trip`} />}
            <div className='formContainer'>
                <div id='title'>
                    <h1>Welcome</h1>
                </div>
                <div id='cityForm'>
                    <h3>Where are you from?</h3>
                    <form autoComplete="off" onSubmit={userCity}>
                        <div className="autocomplete">
                        <input id="myInput" type="text" name="myCountry" placeholder="City" required />
                        </div>
                        <br />
                        <br />
                        <input type="submit" />
                        </form>
                        <h5>{message}</h5>
                </div>
            </div>
        </div>
    )
} 