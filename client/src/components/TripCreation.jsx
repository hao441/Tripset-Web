import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/auth/authSlice';


import autocomplete from '../autoComplete';
import cities from '../listOfCities.json'
import countryLookUp from  '../countryLookUp.json';
import cityLookup from '../cityLookUp.json'


import '../App.css'
import './css/tripCreation.css'

export default function TripCreation () {

    //redux selector
    const sessionToken = useSelector(selectSessionToken);
    
    //Use Effects
    useEffect(() => {
        autocomplete(document.getElementById("myInput"), cities);

        setTimeout((checkUserSignIn()), /*'300000'*/ '300')
    });

    //Use States
    const [loggedIn, setLoggedIn] = useState(true);
    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [toTrips, setToTrips] = useState(false);

    //functions
    function checkUserSignIn() {

        fetch('http://localhost:9000/verifyuser', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('User logged in.')
                } else {
                    console.log('User not logged in.')
                    setLoggedIn(false);
                }
            })
            .catch(err => console.log(err));
    };

    const doSomething = (e) => {
        e.preventDefault();
        fetch('http://localhost:9000/tripcreation', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"token": sessionToken, "tripName": tripName})
            })
            .then(res => res.json())
            .then (res => {
                if (res.result) {
                    console.log('Trip created.')
                    setToTrips(true);
                } else {
                    console.log('Trip not created.')
                }
            })
    }
    

    return(
        <div className="page">
            {toTrips && <Navigate replace to="/trip" />}
            <h1>Trip Creation</h1>
            <form autoComplete="off" onSubmit={doSomething}>
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