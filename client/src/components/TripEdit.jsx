import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentication, selectTrips, selectUserName } from '../features/auth/authSlice';


import '../App.css'
import './css/tripcreation.css'
import { deleteTripAsync, setTripAsync } from "../features/auth/tripThunk";
import CountryComplete from "./sub-components/CountryComplete";
import { useRef } from "react";

const TripEdit = () => {

    const {trip} = useParams();

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUsername = useSelector(selectUserName);
    const sessionTrips = useSelector(selectTrips);
    const trips = useSelector(selectTrips);
    const auth = useSelector(selectAuthentication);

    const tripStartDate = useRef(null) ;
    const tripEndDate = useRef(null);

    useEffect(() => {
        tripStartDate.current = sessionTrips === '' ? '' :  trips[trip].startDate
        tripEndDate.current = sessionTrips === '' ? '' :  trips[trip].endDate

        console.log(tripStartDate)
    })

    

    //Use States
    const [tripName, setTripName] = useState(trip);
    // const [destination, setDestination] = useState(trip)
    const [startDate, setStartDate] = useState(tripStartDate);
    const [endDate, setEndDate] = useState(tripEndDate);
    const [message, setMessage] = useState('');

    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    
    //functions
    const createTrip = (e) => {
        e.preventDefault();
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (start > end ) return setMessage("Start Date must be before End Date.")
        if (start < now) return setMessage("Cannot set start date to a date in the past.")

        //redux dispatch
        dispatch(deleteTripAsync({"email": sessionUsername, "tripName": trip}));
        dispatch(setTripAsync(
            {"email": sessionUsername,
            "tripName": tripName,
            "trip":
            {"location": document.getElementById('countryInput').value, 
             "startDate": startDate,
             "endDate": endDate,
             "itinerary": !trips[trip].itinerary ? '' : trips[trip].itinerary
            }})
        )
        setTripName(''); setStartDate(''); setEndDate('');
        navigate('/trip');
    }

    const handleTripsNav = () => {
        navigate(`/trip/${trip}`)
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Edit Trip</h1></div>
                {/* content */}
                <div className="former top-margin">
                    <form autoComplete="off" onSubmit={createTrip}>
                        <h1 className="minortitle">Enter your trip details.</h1>
                        <div><input className="form-item text-input edit-title" type='text' value={tripName} onChange={((e) => setTripName(e.target.value))} placeholder={trip} required /></div>
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

export default TripEdit;