import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, selectSessionToken, selectUserName } from '../features/auth/authSlice';
import countries from '../countriesArray.json'


import '../App.css'
import './css/tripCreation.css'
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
    
    //Use Effects
    useEffect(() => {
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
        if (sessionUsername === '') return console.log("User not logged in.")
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
                </div>
            </div>
        </div>
    )
}