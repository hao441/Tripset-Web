import React, {useState, useEffect, useRef} from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectTrips, selectAuthentication, selectRes } from '../features/auth/authSlice';

//Other
import { deleteItineraryItemAsync, setItineraryAsync } from "../features/auth/tripThunk";
import MapsLocationSearch from "./sub-components/MapsLocationSearch";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { ReactComponent as Loader } from '../assets/loader.svg';
import '../App.css'
import './css/itinerarycreation.css'

const ItineraryEdit = () => {

    let { trip, item } = useParams()

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUsername = useSelector(selectUserName);
    const sessionTrips = useSelector(selectTrips);
    const sessionResult = useSelector(selectRes);
    const auth = useSelector(selectAuthentication);

    const itineraryLocation = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].location : '')
    const itineraryLat = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lat : '')
    const itineraryLng = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].lng : '')
    const itineraryCategory = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].category : '')
    const itineraryStartDate = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startDate : '')
    const itineraryEndDate = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endDate : '')
    const itineraryStartTime = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].startTime : '')
    const itineraryEndTime = useRef(sessionTrips !== '' ? sessionTrips[trip].itinerary[item].endTime : '')


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
    const [loading, setLoading] = useState(false);

    //Other variables
    const startDateObj = new Date(startDate)
    const nowObj = new Date()

    useEffect(() => {
        document.getElementById('mapsInput').value = sessionTrips[trip].itinerary[item].location;
    }, [])


    useEffect(() => {

        setTimeout(() => {
            if (document.getElementById('mapsInput').value !== '') {
                geocodeByAddress(document.getElementById('mapsInput').value)
                .then(results => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    setLat(lat);
                    setLng(lng);
                    setLocation(document.getElementById('mapsInput').value);
                })
                .catch((error) => {console.log(error);})
            }
        }, 500)
        
    });
    
    //functions
    const createItinerary = (e) => {
        e.preventDefault();
        setLoading(true);
        //Error handling
        if (sessionUsername === '' || sessionUsername === undefined) return setMessage('Not logged in.');
        if (startDate > endDate || (startDate === endDate && startTime >= endTime) ) return setMessage("Start time must be before end time.");
        if (startDateObj < nowObj) return setMessage("Cannot set start date to a date in the past.");
        if (lat === '' || lng === '') return setMessage('Please select a location from the list.');

        if (
            itineraryName === item &&
            location === sessionTrips[trip]['itinerary'][item].location &&
            lat === sessionTrips[trip]['itinerary'][item].lat &&
            lng === sessionTrips[trip]['itinerary'][item].lng &&
            category === sessionTrips[trip]['itinerary'][item].category &&
            startDate === sessionTrips[trip]['itinerary'][item].startDate &&
            endDate === sessionTrips[trip]['itinerary'][item].endDate &&
            startTime === sessionTrips[trip]['itinerary'][item].startTime &&
            endTime === sessionTrips[trip]['itinerary'][item].endTime
        ) return navigate(`/trip/${trip}`);


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
        
            console.log(sessionResult)
        setItineraryName(''); setLocation(''); setStartDate(''); setEndDate('');
        setLoading(false);
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
                        <div><button className="form-item form-button" type='submit'>{loading ? <Loader className="spinner" /> : "Submit"}</button></div>
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