import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import autocomplete from '../autoComplete.js'
import cities from '../listOfCities2.json'
import countryLookUp from  '../countryLookUp.json';
import cityLookup from '../cityLookUp.json'

//Redux
import { selectSessionToken, selectUserName, selectHomeCity, selectMessage } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

//css
import '../App.css'
import './css/city.css';
import { setCityAsync } from '../features/auth/tripThunk.js';

export default function City() {

    //react router
    const navigate = useNavigate()
    
    //redux
    const dispatch = useDispatch();

    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName);
    const sessionHomeCity = useSelector(selectHomeCity);
    const sessionMessage = useSelector(selectMessage);

    //use states
    const [message, setMessage] = useState('');
    const [toTrip, setToTrip] = useState(false);
    const [count, setCount] = useState(0);


    useEffect(() => {
        console.log(sessionHomeCity)
        autocomplete(document.getElementById("myInput"), cities);
    })
    

    const userCity = (e) => {
        e.preventDefault();
        let city = document.getElementById('myInput').value

        let cityString = city.match(/.+(?=,)/)[0]
        let countryString = city.match(/(?=, ).+(?=\W\W\W\W\W)/)[0].replace(', ', '')

        if (cityLookup[cityString] == null) return setMessage('Please select an option.')
        
        dispatch(setCityAsync({"email": sessionUsername, "city": cityString, "country": countryString, "lat": cityLookup[cityString].lat, "lng": cityLookup[cityString].lng}));
        
        setMessage('');
        setToTrip('');
        setCount('');
    }

    if (sessionHomeCity === '' || sessionHomeCity === undefined) return (
        <div className="page">
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

    if (sessionHomeCity !== '' && sessionHomeCity !== undefined) return (
        <Navigate replace to='/trip' />
    )

    return (
        <div>
        </div>
    )
} 