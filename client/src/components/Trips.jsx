//React
import React, { useState, useEffect} from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import CreateTrip from "./sub-components/CreateTrip";

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectSessionToken, selectTripNames, selectTrips, setTrips } from '../features/auth/authSlice';

//css
import '../App.css'
import './css/trips.css'

export default function Trip () {
    //redux/router
    const navigate = useNavigate();

    const auth = useSelector(selectAuthentication)
    const trips = useSelector(selectTrips);
    const tripNames = useSelector(selectTripNames)

    //functions
    const handleTripCreate = () => {
        setTimeout(() => {        
         navigate('/tripcreation');
        }, 1000)
    }

    const handleItinerary = (button) => {
        navigate(`${button.target.id}`);
    }

    // if (!auth) return (
    //     <Navigate replace to="/welcome" />
    // );

    if (tripNames[0] === undefined) return (
        <div className="background-cut">
            <div className="container">
            <h1 className="trip-title">Trips</h1>
            <div className="former">
                <div><h1 className="content">You have no trips planned</h1></div>
                <div><button className="content form-input form-button" onClick={handleTripCreate}>Create Trip</button></div>
                {/* <div><Link className="content form-input form-button">Account /></div> */}
                
                </div>
                
            </div>
            <Link className="botton-link" to='/account'>account</Link>
        </div>
        ) 
    
    const buttonList = tripNames.map((trip) => {
        return (
            <button id={trip} key={trip.toString()} onClick={handleItinerary}>
                {trip.toString()}
            </button>
        )
    })

    return (
        <div>
            {buttonList}
            <button onClick={handleTripCreate}>+</button>
        </div>
    )
}