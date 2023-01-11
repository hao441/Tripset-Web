//imports
import React, {useState, useEffect} from "react";
import { useParams, useSearchParams, Link, useNavigate, useLoaderData } from "react-router-dom";

//css
import '../App.css'
import './css/itinerary.css'

//Other
import { findItinerary } from "../fetchTrips";
import { useSelector } from "react-redux";
import { selectTrips } from "../features/auth/authSlice";

export default function Trip() {

    //redux/router
    const trips = useSelector(selectTrips)
    const navigate = useNavigate()
    const tripper = useLoaderData()

    //useParams
    let { trip } = useParams(); 

    useEffect(() => {
        console.log(tripper)
    })

    const handleItineraryItem = () => {
        navigate('itinerarycreation')
    }

    // const buttonList = trips.map((button) => {
    //     return (
    //         <button key={button.toString()} onClick={handleItineraryItem}>
    //             {button.toString()}
    //         </button>
    //     )
    // })

    if (!trips) {
        <div>
            <h1>You don't have any trips</h1>
            <Link to='/trip'></Link>
        </div>
    }

    if (!trips[`${trip}`]) return (
        <div>
            <h1>Trip doesn't exist</h1>
            <Link to='/trip'>Go Back</Link>
        </div>
    )

    if (!trips[`${trip}`]['itinerary']) return (
        <div className="background-cut-invert">
            <div className="container">
                <h1 className="title">{trip[0].toUpperCase()+trip.slice(1,)}</h1>
                <div><h1 className="content ">No Itinerary Yet.</h1></div>
                <div><button className="content form-input form-button" onClick={handleItineraryItem}>Create Itinerary Item</button></div>
            </div>
        </div>
    )

    return (
        <div className="page">
            <h1 className="trip-itinerary-title">{trip}</h1>
            <ul>
                {trip}
                <li>Itinerary Item 1</li>
                <li>Itinerary Item 2</li>
                <li>Itinerary Item 3</li>
                <li>Itinerary Item 4</li>
            </ul>
        </div>
    )
}