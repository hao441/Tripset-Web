//React
import React, { useState} from "react";
import { Navigate, useNavigate, useParams } from 'react-router-dom';

 
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectTrips, selectUserName, } from '../features/auth/authSlice';

//css
import '../App.css'
import './css/itinerary.css'
import Mapper from "./sub-components/MapView";
import { deleteItineraryItemAsync, deleteTripAsync } from "../features/auth/tripThunk";
import { useEffect } from "react";

export default function Trip () {
    //redux/router
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {trip} = useParams();

    const auth = useSelector(selectAuthentication);
    const username = useSelector(selectUserName);
    const trips = useSelector(selectTrips);

    const [isExpanded, setIsExpanded] = useState(false);

    const [showMap, setShowMap] = useState(false);
    
    useEffect(() => {
        // console.log(trips[trip])
        // console.log(Object.keys(trips[trip]))
    })

    //Navigation
    const handleItineraryCreate = () => {navigate('itinerarycreation');}
    const handleEditItineraryNav = (selectedItem) => {navigate(`${selectedItem}/itineraryedit`)}
    const handleTripsNav = () => {navigate('/trip');}

    const deleteTrip = () => {
        dispatch(deleteTripAsync({"email": username, "tripName": trip}));
        navigate('/trip');
    }

    const deleteItem = (selectedItem) => {
        dispatch(deleteItineraryItemAsync({"email": username, "tripName": trip, "itineraryName": selectedItem}));
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )

    const buttonList = () => Object.keys(trips[trip]['itinerary'])
            .slice()
            .sort((a,b) => { 
                const dateA = new Date(trips[trip]['itinerary'][a]['startDate'])
                const dateB = new Date(trips[trip]['itinerary'][b]['startDate'])

                const parseA = Date.parse(`${dateA.toDateString()} ${trips[trip]['itinerary'][a]['startTime']}:00 GMT`)
                const parseB = Date.parse(`${dateB.toDateString()} ${trips[trip]['itinerary'][b]['startTime']}:00 GMT`)

                return parseA - parseB
            })
            .map((item, index, array) => {

                const startDate = new Date(trips[trip]['itinerary'][item]['startDate'])

                const currentStart = new Date(trips[trip]['itinerary'][item]['startDate'])
                const lastStart = index !== 0 && new Date(trips[trip]['itinerary'][array[index-1]]['startDate'])



                const yearCheck = index === 0 || currentStart.getFullYear() !== lastStart.getFullYear();
                const dateCheck = index === 0 || currentStart.getDate() !== lastStart.getDate()
                
                const category = trips[trip]['itinerary'][item]['category']
                const location = trips[trip]['itinerary'][item]['location']
                const itinStartDate = trips[trip]['itinerary'][item]['startDate']
                const itinEndDate = trips[trip]['itinerary'][item]['endDate']
                const itinStartTime = trips[trip]['itinerary'][item]['startTime']
                const itinEndTime = trips[trip]['itinerary'][item]['endTime']

                const timeFormatting = () => {

                    const timeString = trips[trip]['itinerary'][item]['startTime']
                    
                    const ampm = timeString.match(/^(\d+)/)[0] > 12
                                    ? timeString.replace(/^(\d+)/, (m) => { return m - 12 }) + " PM"
                                    : timeString + " AM"

                    return ampm
                }

                return (
                    <div key={index.toString()} className='list-container'>
                        <div id="timeline-items">
                            <h1 id='year-title'>{`${yearCheck ? startDate.getFullYear() :'' }`}</h1>
                            <h2 id='date-title'>{dateCheck ? startDate.toDateString().slice(4, -5) : ''}</h2>
                        </div>
                        <div className="container">                     
                            <div className="item">                              
                                <div>
                                    <button className="itin-title-button" onClick={(e) => isExpanded === item ? setIsExpanded('') : setIsExpanded(item)}>
                                        <div className="row-container contain-start">
                                            <h1 className="itin-time">{timeFormatting()}</h1>
                                            <h1 className="start itin-item">{item}</h1>   
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="itin-grid">
                                    <div style={{"borderLeft": "1px solid #000", "marginLeft" : "80%", "height" : "90%"}}></div>
                                    <div className="itin-grid-2">
                                        {isExpanded === item && (
                                            <div>
                                                <div>
                                                    <h2 className="itin-body-text"><b>Category: </b>{`${category}`}</h2>
                                                    <h2 className="itin-body-text"><b>Start: </b>{`${itinStartDate}, ${itinStartTime}`}</h2>
                                                    <h2 className="itin-body-text"><b>End: </b>{`${itinEndDate}, ${itinEndTime}`}</h2>
                                                    <h2 className="itin-body-text"><b>Location: </b>{`${location}`}</h2>
                                                    <hr className="itin-hr" />
                                                    <div className="itin-button-container">
                                                        <div className="itin-button-container-1 row-container">
                                                            <div><button className="itin-button inbetween-margin" onClick={() => handleEditItineraryNav(item)}>Edit</button></div>
                                                            <div><button className="itin-button inbetween-margin" onClick={() => deleteItem(item)}>Delete</button></div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <br />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                
                    )
                })

    const checkItinerary = () => {
        if (typeof trips === 'string') return (
            <div>
                <br/>
                <h2>Loading Itinerary...</h2>
            </div>
        )
        if (typeof trips === 'object' && !trips[trip]) return (
            <div className="container top-margin">
                <div className="subtitle">Trip not found</div>
                <br />
                <div><button className="form-button" onClick={() => handleTripsNav()}>Return to Trips</button></div>
                
            </div>
        )
        if (!trips[trip]['itinerary'] || !Object.keys(trips[trip]['itinerary'])[0]) return (
            <div>
                    <div><h1 className="content">You have no Itinerary Items.</h1></div>
                    <div>
                        <button className="content form-input form-button" onClick={handleItineraryCreate}>Create Itinerary</button>        
                    </div>
                    <br />
                    <div>
                        <button className="content form-input form-button" onClick={() => navigate('tripedit')}>Edit Trip Details</button>
                        <br />
                        <br />
                        <button className="content form-input form-button" onClick={deleteTrip}>Delete Trip</button>
                    </div>
            </div>
        )
        if (trips[trip] !== undefined || trips[trip]['itinerary']) return (
            <div>
                <div className="container">
                    <div className="grid-div">
                        <div className="grid-div-1">
                            <div className="itin-buttons">
                                <button className="side-button" onClick={(e) =>  !showMap ? setShowMap(true) : setShowMap(false)}>Switch View</button>
                                <button className="side-button" onClick={handleItineraryCreate}>Add Item +</button>
                                <button className="side-button" onClick={(() => navigate('tripedit'))}>Edit Trip</button>
                                <button className="side-button" onClick={() => deleteTrip()}>Delete Trip</button>
                            </div>
                        </div>
                        <div className="grid-div-2">{showMap ? <div className="map"><Mapper /></div> : <div className="gas">{buttonList()}</div>}</div>
                    </div>
                </div>
            </div>
        )

        return (
            <div></div>
        )
    };

    return (
        <div className="background-cut-invert">
            <div className="container">
                <button className="trips-nav-button" onClick={handleTripsNav}>{`< `} Trips</button>
                <h1 className="title">{trip && trip[0].toUpperCase() + trip.slice(1,)}</h1>
                {checkItinerary()}
            </div>
        </div>
        )
}