import React, { useState} from "react";
import { Link, Navigate } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/auth/authSlice';

import '../App.css'
import './css/itineraryCreation.css'
import NewComponent from "./MapsLocationSearch";

export default function ItineraryCreation () {

    //useStates
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    //functions
    const iCreation = () => {
        
    }

    return(
        <div className="page">
            <h1>Itinerary Item</h1>
            <form onSubmit={iCreation}>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <br />
                <br />
                <label htmlFor="category">Category</label>
                <br />
                <select className='form-select' name="cateogry" id="cateogry">
                    <option value="transport">Transport</option>
                    <option value="accomodation">Accomodation</option>
                    <option value="activity">Activity</option>
                </select>     
                <br />
                <br />
                <label htmlFor="location">Location</label>
                <br />
                <NewComponent />     
                <br />
                <br />
                <label htmlFor="endDate">Dates</label>
                <br />
                <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
                <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
                <br />
                <br />
                <label htmlFor="startTime">Time</label>
                <br />
                <input type="time" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>
                <input type="time" id="endTime" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>
                <br />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}