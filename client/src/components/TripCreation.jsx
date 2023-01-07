import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, selectSessionToken, selectUserName } from '../features/auth/authSlice';


import autocomplete from '../autoComplete';
import countries from '../countriesArray.json'
import countryLookUp from  '../countryLookUp.json';
import cityLookup from '../cityLookUp.json'


import '../App.css'
import './css/tripCreation.css'
import { setTripAsync } from "../features/auth/tripThunk";

export default function TripCreation () {

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName)
    const sessionMessage = useSelector(selectMessage)
    
    //Use Effects
    useEffect(() => {
        autocomplete(document.getElementById("myInput"), countries);

        console.log(sessionUsername)
    });

    //Use States
    const [loggedIn, setLoggedIn] = useState(true);
    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [toTrips, setToTrips] = useState(false);

    //functions

    const createTrip = (e) => {
        e.preventDefault();
        dispatch(setTripAsync(
            {"email": sessionUsername,
             "tripName": tripName, 
             "location": document.getElementById('myInput').value, 
             "startDate": startDate, 
             "endDate": endDate
            })
        )
        setTripName(''); setDestination(''); setStartDate(''); setEndDate('');
        navigate('/trip');
    }
    
    return(
        <div className="page">
            <h1>Trip Creation</h1>
            <b>Message: {JSON.stringify(sessionMessage)}</b> 
            {sessionUsername}
            <br />
            <br />
            <form autoComplete="off" onSubmit={createTrip}>
                <label>Trip Name</label>
                <br />
                <input id='tripName' type='text' value={tripName} onChange={((e) => setTripName(e.target.value))} required />
                <br />
                <br />
                <label>Where to</label>
                <br />
                <div className="autocomplete">
                        <input id="myInput" type="text" name="myCountry" placeholder="Country" required/>
                </div>
                <br />
                <br />
                <label>Dates</label>
                <br />
                <input type='date' value={startDate} onChange={((e) => setStartDate(e.target.value))} required  />
                <input type='date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required />
                <br />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}