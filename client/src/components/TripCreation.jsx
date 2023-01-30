import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentication, selectTrips, selectUserName } from '../features/auth/authSlice';


import '../App.css';
import './css/tripcreation.css';
import { setTripAsync } from "../features/auth/tripThunk";
import CountryComplete from "./sub-components/CountryComplete";

export default function TripCreation () {

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUsername = useSelector(selectUserName);
    const sessionTrips = useSelector(selectTrips);
    const auth = useSelector(selectAuthentication);

    
    const tripNames = useRef(null);

    //Use States
    const [tripName, setTripName] = useState('');
    // const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [message, setMessage] = useState('');

    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    //Use Effects
    useEffect(() => {
        tripNames.current = sessionTrips ? Object.keys(sessionTrips) : '';
    });
    
    //functions
    const createTrip = (e) => {
        e.preventDefault();
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (tripNames.current.indexOf(tripName) !== -1) return setMessage('Trip name is taken.');
        if (start > end ) return setMessage("Start Date must be before End Date.")
        if (start < now) return setMessage("Cannot set start date to a date in the past.")

        //redux dispatch 
        dispatch(setTripAsync(
            {"email": sessionUsername,
            "tripName": tripName,
            "trip":
            {"location": document.getElementById('countryInput').value, 
             "startDate": startDate,
             "endDate": endDate
            }})
        )
        setTripName(''); setStartDate(''); setEndDate('');
        navigate('/trip');
    }

    const handleTripsNav = () => {
        navigate('/trip')
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Create Trip</h1></div>
                {/* content */}
                <div className="former top-margin">
                    <form autoComplete="off" onSubmit={createTrip}>
                        <h1 className="minortitle">Enter your trip details.</h1>
                        <div><input className="trip-text-input" type='text' value={tripName} onChange={((e) => setTripName(e.target.value))} placeholder='Trip Name' required /></div>
                        <div><CountryComplete /></div>
                        <div className="dates">
                        <div><label className="trip-date-label">Start Date</label><label className="date-label">End Date</label></div>
                        <div><input className="trip-date-input" type='date' value={startDate} onChange={((e) => setStartDate(e.target.value))} placeholder="mm/dd/yyyy" required  />
                        <input className="trip-date-input" type='date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required /></div>
                        </div>
                        <div><button className="trip-submit-button" type='submit'>Submit</button></div>
                    </form>
                    <hr className="trip-hor" />
                    <div><button className="trip-navigation-button" onClick={handleTripsNav}>Back to Trips</button></div>
                    <p style={{'color' : 'crimson'}}>{message}</p>
                </div>
            </div>
        </div>
    )
}