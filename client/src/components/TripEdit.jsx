import React, {useState, useRef} from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentication, selectTrips, selectUserName } from '../features/auth/authSlice';

//Other
import { deleteTripAsync, setTripAsync } from "../features/auth/tripThunk";
import CountryComplete from "./sub-components/CountryComplete";
import { ReactComponent as Loader } from '../assets/loader.svg';
import '../App.css'
import './css/tripcreation.css'
import { useEffect } from "react";

const TripEdit = () => {

    const {trip} = useParams();

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUsername = useSelector(selectUserName);
    const trips = useSelector(selectTrips);
    const auth = useSelector(selectAuthentication);

    const tripStartDate = useRef(trips[trip]['startDate']);
    const tripEndDate = useRef(trips[trip]['endDate']);
    const location = useRef(trips[trip]['location'])

    useEffect(() => {
        document.getElementById('countryInput').value = location.current
    }, [])


    //Use States
    const [tripName, setTripName] = useState(trip);
    // const [destination, setDestination] = useState(trip)
    const [startDate, setStartDate] = useState(tripStartDate.current);
    const [endDate, setEndDate] = useState(tripEndDate.current);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    
    //functions
    const editTrip = (e) => {
        e.preventDefault();
        setLoading(true)
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (start > end ) return setMessage("Start Date must be before End Date.")
        if (start < now) return setMessage("Cannot set start date to a date in the past.")

        if (tripName === trip && 
            startDate === trips[trip]['startDate'] && 
            document.getElementById('countryInput').value === trips[trip]['location'] && 
            endDate === trips[trip]['endDate']
            ) return navigate('/trip');

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
                    <form autoComplete="off" onSubmit={editTrip}>
                        <h1 className="minortitle">Enter your trip details.</h1>
                        <div><input className="trip-text-input" type='text' value={tripName} onChange={((e) => setTripName(e.target.value))} placeholder={trip} required/></div>
                        <div><CountryComplete /></div>
                        <div className="dates">
                            <div><label className="date-label">Start Date</label><label className="date-label">End Date</label></div>
                            <div><input className="form-item date-input" type='date' value={startDate} onChange={((e) => setStartDate(e.target.value))} placeholder="mm/dd/yyyy" required  />
                        <input className="form-item date-input" type='date' value={endDate} onChange={((e) => setEndDate(e.target.value))} required /></div>
                        </div>
                        <div><button className="form-item form-button" type='submit'>{loading ? <Loader className="spinner" /> : "Submit"}</button></div>
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