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
import CityComplete from './CityComplete.jsx';

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
        <div className="background">
            <div className='container'>
                <h1 className='lessertitle'>Welcome</h1>
                <div className='former'>
                    <div id='cityForm'>
                    <div className='top-margin'><h3>Where are you from?</h3></div>
                    <br />
                    <form autoComplete="off" onSubmit={userCity}>
                        <CityComplete />
                        <br />
                        <br />
                        <div><button className='form-item form-button submit'>Submit</button></div>
                        </form>
                        <h5>{message}</h5>
                    </div>
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