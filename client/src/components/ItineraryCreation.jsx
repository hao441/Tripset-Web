import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, selectSessionToken, selectTripNames, selectUserName, selectTrips } from '../features/auth/authSlice';
import countries from '../countriesArray.json'


import '../App.css'
import './css/itinerarycreation.css'
import { setTripAsync } from "../features/auth/tripThunk";
import CityComplete from "./CityComplete";
import CountryComplete from "./CountryComplete";
import MapsLocationSearch from "./MapsLocationSearch";

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function ItineraryCreation () {

    let { trip } = useParams()

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName)
    const sessionMessage = useSelector(selectMessage)
    const sessionTripNames = useSelector(selectTripNames)
    const sessionTrips = useSelector(selectTrips)
    
    

    //Use States
    const [itineraryName, setItineraryName] = useState('');

    const [location, setLocation] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    const [category, setCategory] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [message, setMessage] = useState('');

    //Other variables
    

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const nowObj = new Date()

    //Use Effects
    useEffect(() => {
        const mapsInput = document.getElementById('mapsInput').value

        if (mapsInput !== '') {
            geocodeByAddress(mapsInput)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLat(lat);
                setLng(lng);
                setLocation(mapsInput);
            })
            .catch((error) => {console.log(error);})
        }
        console.log(startDateObj)
        console.log(endDateObj)

        console.log(startDate === endDate)
    });
    
    //functions
    const createItinerary = (e) => {
        e.preventDefault();
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (sessionTripNames.indexOf(itineraryName) !== -1) return setMessage('Itinerary name is taken.');
        if (startDate > endDate || startDate === endDate && startTime >= endTime ) return setMessage("Start time must be before end time.");
        if (startDateObj < nowObj) return setMessage("Cannot set start date to a date in the past.");
        if (lat === '' || lng === '') return setMessage('Please select a location from the list.');


        //redux dispatch 
        // dispatch(setItineraryAsync(
        //     {"email": sessionUsername,
        //      "itineraryName": itineraryName, 
        //      "location": location,
        //      "lat": lat,
        //      "lng": lng,
        //      "startDate": startDate, 
        //      "startTime": startTime
        //      "endDate": endDate
        //      "endTime": endtime
        //     })
        // )
        setItineraryName(''); setLocation(''); setStartDate(''); setEndDate('');
        navigate(`/trip/${trip}`);
    }

    const handleItineraryNav = () => {
        navigate(`/trip/${trip}`)
    }
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Create Itinerary</h1></div>
                {/* content */}
                <div className="former top-margin">
                    <form autoComplete="off" onSubmit={createItinerary}>
                        <h1 className="minortitle">Enter your Itinerary details.</h1>
                        <div><input className="form-item text-input" type='text' value={itineraryName} onChange={((e) => setItineraryName(e.target.value))} placeholder='Itinerary Name' required /></div>
                        <div><MapsLocationSearch     /></div>
                        <div className="input-select">
                            <select name='category' className="form-item text-input" type='select' placeholder="Select a category" required>
                                <option value="">--Please choose a category--</option>
                                <option value="Accomodation">Accomodation</option>
                                <option value="Transport">Transport</option>
                                <option value="Activity">Activity</option>
                            </select>
                        </div>
                        <div className="dates">
                            <div className="start-finish"><label>Start</label></div>
                            <div>
                                <input className=" center-text" type='date' placeholder='Start Date' value={startDate} onChange={((e) => setStartDate(e.target.value))} required/>
                                <input className="time"  type='time' placeholder='Start Time' value={startTime} onChange={((e) => setStartTime(e.target.value))} required/>
                            </div>
                        </div>
                        <div className="dates">
                            <div className="start-finish"><label>End</label></div>
                            <div>
                                <input className="date" type='date' placeholder='Start Date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required/>
                                <input className="time end-time"  type='time' placeholder='Start Time' value={endTime} onChange={((e) => setEndTime(e.target.value))} required/>
                            </div>
                        </div>
                        <div><button className="form-item form-button" type='submit'>Submit</button></div>
                    </form>
                    <hr className="hor" />
                    <div><button className="form-item form-button signup" onClick={handleItineraryNav}>Back to {trip}</button></div>
                    <p style={{'color' : 'crimson'}}>{message}</p>
                </div>
            </div>
        </div>
    )
}