import React from 'react';
import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import cityLookup from '../data/cityLookUp.json'

//Redux
import { selectSessionToken, selectUserName, selectHomeCity, selectMessage, selectAuthentication } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

//css
import '../App.css'
import './css/city.css';
import { setCityAsync } from '../features/auth/tripThunk.js';
import CityComplete from './sub-components/CityComplete.jsx';

export default function City() {
    //redux
    const dispatch = useDispatch();

    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName);
    const sessionHomeCity = useSelector(selectHomeCity);
    const sessionMessage = useSelector(selectMessage);
    const auth = useSelector(selectAuthentication);


    //use states
    const [message, setMessage] = useState('');
    const [toTrip, setToTrip] = useState(false);
    const [count, setCount] = useState(0);


    useEffect(() => {
        console.log(`city is: ${sessionHomeCity}`)
        console.log(`username is : ${sessionUsername}`)
    })
    

    const userCity = (e) => {
        e.preventDefault();
        let city = document.getElementById('cityInput').value
        console.log(city)

        let cityString = city.match(/.+(?=,)/)[0]
        console.log(cityString)
        let countryString = city.match(/(?=, ).+(?=\W\W\W\W\W)/)[0].replace(', ', '')
        console.log(countryString)

        if (cityLookup[cityString] == null) return setMessage('Please select an option.')

        if (sessionUsername === '') return console.log(`Not signed in.`)
        
        dispatch(setCityAsync({"email": sessionUsername, "city": cityString, "country": countryString, "lat": cityLookup[cityString].lat, "lng": cityLookup[cityString].lng}));

        console.log(sessionUsername, cityString, countryString, auth, cityLookup[cityString].lat, cityLookup[cityString].lng)

        setMessage('');
        setToTrip('');
        setCount('');
    }


    if (!auth) return (
        <Navigate to="/welcome" />
    )

    if (!sessionHomeCity) return (
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
                        <div><button type="submit" className='form-item form-button submit'>Submit</button></div>
                        </form>
                        <h5>{message}</h5>
                    </div>
                </div>
            </div>
        </div>
    )

    if (sessionHomeCity) return (
        <Navigate replace to='/trip' />
    )

    return (
        <div>
        </div>
    )
} 