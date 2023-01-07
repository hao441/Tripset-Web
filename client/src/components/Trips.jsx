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

    console.log(tripNames)

    const hello = tripNames == '' ? <div>'No trips available.'<button onClick={navigate('/tripcreation')}>Create Trip</button></div> : tripNames.map((trip) => {
        <button key={trip.toString()}>{trip}</button>
    })

    if (!auth) return (
        <Navigate replace to="/welcome" />
    );

    return(
        <div className="page">
            {tripNames}
            {hello}
        </div>
    )
}