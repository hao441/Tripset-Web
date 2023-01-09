//React
import React, { useState, useEffect} from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import CreateTrip from "./sub-components/CreateTrip";

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectSessionToken, selectTripNames, selectTrips, setTrips } from '../features/auth/authSlice';

//css
import '../App.css'
import './css/trip.css'

export default function Trip () {
    //redux/router
    const navigate = useNavigate();

    const auth = useSelector(selectAuthentication)
    const trips = useSelector(selectTrips);
    const tripNames = useSelector(selectTripNames)

    //functions
    const handleTripCreate = () => {
        navigate('/tripcreation');
    }

    const handleItinerary = (button) => {
        navigate(`${button.target.id}`);
    }

    

    if (!auth) return (
        <Navigate replace to="/welcome" />
    );

    if (tripNames === '') return (
        <div onClick={handleTripCreate}>'No trips available.'<button>Create Trip</button></div>
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