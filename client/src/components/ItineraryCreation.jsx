import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectTripNames, selectUserName, selectAuthentication, selectTrips, selectMessage, selectRes } from '../features/auth/authSlice';

//Other
import { setItineraryAsync } from "../features/auth/tripThunk";
import MapsLocationSearch from "./sub-components/MapsLocationSearch";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { ReactComponent as Loader } from '../assets/loader.svg';
import '../App.css'
import './css/itinerarycreation.css'

export default function ItineraryCreation () {

    let { trip } = useParams()

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUsername = useSelector(selectUserName)
    const sessionTrips = useSelector(selectTrips);
    const sessionTripNames = useSelector(selectTripNames)
    const sessionMessage = useSelector(selectMessage);
    const sessionRes = useSelector(selectRes);
    const auth = useSelector(selectAuthentication);

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
    const [loading, setLoading] = useState(false);

    //Other variables
    

    const startDateObj = new Date(startDate)
    const nowObj = new Date()

    //Use Effects

    useEffect(() => {

        const mapsInput = document.getElementById('mapsInput').value

        setTimeout(() => {
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
        }, 500);
        
    });
    
    //functions
    const createItinerary = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('')

        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) {setMessage('Not logged in.'); return setLoading(false);};
        if (sessionTripNames.indexOf(itineraryName) !== -1) {setMessage('Itinerary name is taken.'); return setLoading(false);}; 
        if (startDate > endDate || (startDate === endDate && startTime >= endTime) ) {setMessage("Start time must be before end time."); return setLoading(false);};
        if (startDateObj < nowObj) {setMessage("Cannot set start date to a date in the past."); return setLoading(false);}; 
        if (sessionTrips[trip]['startDate'] > startDate) {setMessage("Start date must be on or after the trip start date."); return setLoading(false);}; 
        if (sessionTrips[trip]['endDate'] < endDate) {setMessage("End date must be on or before the trip end date."); return setLoading(false);}; 
        if (lat === '' || lng === '') {setMessage('Please select a location from the list.'); return setLoading(false);}; 

        //redux dispatch 
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

        console.log(sessionRes)
        if (sessionRes) {
            return navigate(`/trip/${trip}`)
        } else {
            setItineraryName('');
            setLoading(false);
            return setMessage(sessionMessage);
        }
        // navigate(`/trip/${trip}`);
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
                <div><h1 className="halftitle">Create Itinerary</h1></div>
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
                                <input className=" center-text" type='date' placeholder='Start Date' value={startDate} onChange={((e) => setStartDate(e.target.value))} required/>
                                <input className="time"  type='time' placeholder='Start Time' value={startTime} onChange={((e) => setStartTime(e.target.value))} required/>
                            </div>
                        </div>
                        <div className="dates">
                            <div className="start-finish"><label>End</label></div>
                            <div className="end-time">
                                <input className="date" type='date' placeholder='Start Date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required/>
                                <input className="time"  type='time' placeholder='Start Time' value={endTime} onChange={((e) => setEndTime(e.target.value))} required/>
                            </div>
                        </div>
                        <div><button className="form-item form-button" type='submit'>{loading ? <Loader className="spinner" /> : "Submit"}</button></div>
                    </form>
                    <hr className="hor" />
                    <div><button className="form-item form-button signup" onClick={handleItineraryNav}>Back to {trip}</button></div>
                    <p style={{'color' : 'crimson', "marginTop" : "0"}}>{message}</p>
                </div>
            </div>
        </div>
    )
}