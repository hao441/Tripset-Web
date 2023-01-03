//imports
import React from "react";
import { useParams } from "react-router-dom";

//css
import '../App.css'
import './css/trip.css'

export default function Trip() {

    //variables
    let { trip } = useParams(); 

    //functions

    return (
        <div className="page">
            <h1 className="trip-itinerary-title">{trip}</h1>
            <ul>
                <li>Itinerary Item 1</li>
                <li>Itinerary Item 2</li>
                <li>Itinerary Item 3</li>
                <li>Itinerary Item 4</li>
            </ul>
        </div>
    )
}