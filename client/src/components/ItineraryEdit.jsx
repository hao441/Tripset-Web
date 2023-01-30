import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectTrips, selectAuthentication } from '../features/auth/authSlice';


import '../App.css'
import './css/itinerarycreation.css'
import { deleteItineraryItemAsync, setItineraryAsync } from "../features/auth/tripThunk";
import MapsLocationSearch from "./sub-components/MapsLocationSearch";

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useRef } from "react";

const ItineraryEdit = () => {
    
    const itineraryLocation = useRef()
    const itineraryLat = useRef()
    const itineraryLng = useRef()
    const itineraryCategory = useRef()
    const itineraryStartDate = useRef()
    const itineraryEndDate = useRef()
    const itineraryStartTime = useRef()
    const itineraryEndTime = useRef()

    let { trip, item } = useParams()

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`sessionTrips: ${sessionTrips}`)
    })

    

    
    const sessionUsername = useSelector(selectUserName)
    const sessionTrips = useSelector(selectTrips)
    const auth = useSelector(selectAuthentication);



    itineraryLocation.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].location : ''
    itineraryLat.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lat : ''
    itineraryLng.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lng : ''
    itineraryCategory.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].category : ''
    itineraryStartDate.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startDate : ''
    itineraryEndDate.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endDate : ''
    itineraryStartTime.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startTime : ''
    itineraryEndTime.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endTime : ''


    //Use States
    const [itineraryName, setItineraryName] = useState(item);

    const [location, setLocation] = useState(itineraryLocation.current);
    const [lat, setLat] = useState(itineraryLat.current);
    const [lng, setLng] = useState(itineraryLng.current);

    const [category, setCategory] = useState(itineraryCategory.current);

    const [startDate, setStartDate] = useState(itineraryStartDate.current);
    const [endDate, setEndDate] = useState(itineraryEndDate.current);
    const [startTime, setStartTime] = useState(itineraryStartTime.current);
    const [endTime, setEndTime] = useState(itineraryEndTime.current);

    const [message, setMessage] = useState('');

    //Other variables
    

    const startDateObj = new Date(startDate)
    const nowObj = new Date()

    //Use Effects
    useEffect(() => {

        itineraryLocation.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].location : ''
        itineraryLat.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lat : ''
        itineraryLng.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lng : ''
        itineraryCategory.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].category : ''
        itineraryStartDate.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startDate : ''
        itineraryEndDate.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endDate : ''
        itineraryStartTime.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startTime : ''
        itineraryEndTime.current = sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endTime : ''

        let mapsInput = document.getElementById('mapsInput').value

        console.log(itineraryLocation)

        mapsInput = itineraryLocation

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
    });
    
    //functions
    const createItinerary = (e) => {
        e.preventDefault();
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (startDate > endDate || (startDate === endDate && startTime >= endTime) ) return setMessage("Start time must be before end time.");
        if (startDateObj < nowObj) return setMessage("Cannot set start date to a date in the past.");
        if (lat === '' || lng === '') return setMessage('Please select a location from the list.');


        //redux dispatch 
        dispatch(deleteItineraryItemAsync({"email": sessionUsername, "tripName": trip, "itineraryName": item}));
        dispatch(setItineraryAsync(
            {"email": sessionUsername,
             "tripName": trip,
             "itineraryName": itineraryName,
             "itinerary":
            {"location": location,
             "lat": lat,
             "lng": lng,
             "category": category,
             "startDate": startDate, 
             "startTime": startTime,
             "endDate": endDate,
             "endTime": endTime
            }})
        )

        setItineraryName(''); setLocation(''); setStartDate(''); setEndDate('');
        navigate(`/trip/${trip}`);
    }

    const handleItineraryNav = () => {
        navigate(`/trip/${trip}`)
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )
    
    return(
        <div className="background">
            <div className="grid">
                <div><h1 className="halftitle">Edit Itinerary</h1></div>
                {/* content */}
                <div className="former top-margin">
                    <form autoComplete="off" onSubmit={createItinerary}>
                        <h1 className="minortitle">Enter your Itinerary details.</h1>
                        <div><input id="itinerary-name" className="it-input" type='text' value={itineraryName} onChange={((e) => setItineraryName(e.target.value))} placeholder='Itinerary Name' required /></div>
                        <MapsLocationSearch />
                        <div className="input-select">
                            <select id="categorySelect" name='category' value={category} onChange={((e) => setCategory(e.target.value))} className="it-input" type='select' placeholder="Select a category" required>
                                <option value="">--Please choose a category--</option>
                                <option value="Accomodation">Accomodation</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Sightseeing">Sightseeing</option>
                                <option value="Activities">Activities</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Nightlife">Nightlife</option>
                                <option value="Nature">Nature</option>
                                <option value="Sports and Adventure">Sports and Adventure</option>
                                <option value="Cultural">Cultural</option>
                                <option value="Relaxation">Relaxation</option>
                                <option value="Health and Wellness">Health and Wellness</option>
                                <option value="Educational">Educational</option>
                                <option value="Volunteer and Philanthropy">Volunteer and Philanthropy</option>
                                <option value="Luxury and Premium">Luxury and Premium</option>
                                <option value="Religious">Religious</option>
                            </select>
                        </div>
                        <div className="dates">
                            <div className="start-finish"><label>Start</label></div>
                            <div>
                                <input id="itineraryStartDate" className=" center-text" type='date' placeholder='Start Date' value={startDate} onChange={((e) => setStartDate(e.target.value))} required/>
                                <input id="itineraryStartTime" className="time"  type='time' placeholder='Start Time' value={startTime} onChange={((e) => setStartTime(e.target.value))} required/>
                            </div>
                        </div>
                        <div className="dates">
                            <div className="start-finish"><label>End</label></div>
                            <div>
                                <input id="itineraryEndDate" className="date" type='date' placeholder='Start Date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required/>
                                <input id="itineraryEndTime" className="time end-time"  type='time' placeholder='Start Time' value={endTime} onChange={((e) => setEndTime(e.target.value))} required/>
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

export default ItineraryEdit;