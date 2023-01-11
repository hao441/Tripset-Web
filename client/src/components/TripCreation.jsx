import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, selectSessionToken, selectTripNames, selectUserName } from '../features/auth/authSlice';
import countries from '../countriesArray.json'


import '../App.css'
import './css/tripcreation.css'
import { setTripAsync } from "../features/auth/tripThunk";
import CityComplete from "./CityComplete";
import CountryComplete from "./CountryComplete";

export default function TripCreation () {

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName)
    const sessionMessage = useSelector(selectMessage)
    const sessionTripNames = useSelector(selectTripNames)
    
    

    //Use States
    const [loggedIn, setLoggedIn] = useState(true);
    const [tripName, setTripName] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    const [toTrips, setToTrips] = useState(false);

    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    //Use Effects
    useEffect(() => {
        console.log(document.getElementById('countryInput').value);
    });
    
    //functions
    const createTrip = (e) => {
        e.preventDefault();
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (sessionTripNames.indexOf(tripName) !== -1) return setMessage('Trip name is taken.');
        if (start > end ) return setMessage("Start Date must be before End Date.")
        if (start < now) return setMessage("Cannot set start date to a date in the past.")

        //redux dispatch 
        dispatch(setTripAsync(
            {"email": sessionUsername,
             "tripName": tripName, 
             "location": document.getElementById('countryInput').value, 
             "startDate": startDate, 
             "endDate": endDate
            })
        )
        setTripName(''); setDestination(''); setStartDate(''); setEndDate('');
        navigate('/trip');
    }

    const handleTripsNav = () => {
        navigate('/trip')
    }
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Create Trip</h1></div>
                {/* content */}
                <div className="former top-margin">
                    <form autoComplete="off" onSubmit={createTrip}>
                        <h1 className="minortitle">Enter your trip details.</h1>
                        <div><input className="form-item text-input" type='text' value={tripName} onChange={((e) => setTripName(e.target.value))} placeholder='Trip Name' required /></div>
                        <div><CountryComplete /></div>
                        <div className="dates">
                        <div><label className="date-label">Start Date</label><label className="date-label">End Date</label></div>
                        <div><input className="form-item date-input" type='date' value={startDate} onChange={((e) => setStartDate(e.target.value))} placeholder="mm/dd/yyyy" required  />
                        <input className="form-item date-input" type='date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required /></div>
                        </div>
                        <div><button className="form-item form-button" type='submit'>Submit</button></div>
                    </form>
                    <hr className="hor" />
                    <div><button className="form-item form-button signup" onClick={handleTripsNav}>Back to Trips</button></div>
                    <p style={{'color' : 'crimson'}}>{message}</p>
                </div>
            </div>
        </div>
    )
}