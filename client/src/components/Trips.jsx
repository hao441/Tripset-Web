//React
import React, { useState} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux';
import { selectAuthentication, selectHomeCity, selectTrips, selectUserName } from '../features/auth/authSlice';

//css
import '../App.css'
import './css/trips.css'
import { useEffect } from "react";

export default function Trip () {

    
    //redux/router
    const navigate = useNavigate();

    const auth = useSelector(selectAuthentication);
    const username = useSelector(selectUserName);
    const trips = useSelector(selectTrips);
    const homeCity = useSelector(selectHomeCity)

    const [timeline, setTimeLine] = useState('current');

    const tripNames = !trips ? '' : Object.keys(trips);


    useEffect(() => {
        console.log(homeCity)
    })

    //functions
    const handleTripCreate = () => {
        !auth && navigate('/welcome');
        setTimeout(() => {        
         navigate('/tripcreation');
        }, 1000)
    }

    const handleItinerary = (e) => {
        navigate(`${e.target.id}`);
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )

    const buttonList = () => tripNames
            .slice()
            .sort((a,b) => { 
                const dateA = new Date(trips[a]['startDate'])
                const dateB = new Date(trips[b]['startDate'])
                return dateA - dateB
            })
            .map((trip, index) => {
                const now = new Date()

                const startDate = new Date(trips[trip]['startDate'])
                const endDate = new Date(trips[trip]['endDate'])
                const options = { year: 'numeric', month: 'long', day: 'numeric' };

                if (timeline === 'current' && endDate > now) return (
                        <div key={trip}><button className="trip">
                            <div id={trip} onClick={(e) => handleItinerary(e)} className="trip-name">{trip}</div>
                            <div  className="row-container">
                                <div className="row-items"><p className="row-label">from</p>
                                <p className="p-text">{startDate.toLocaleDateString("en-US", options)}</p></div>
                                <div className="row-items"><p className="row-label">to</p>
                                <p className="p-text">{endDate.toLocaleDateString("en-US", options)}</p></div>
                            </div>
                        </button></div>
                )

                if (timeline === 'past' && endDate < now) return (
                    <div key={trip}><button className="trip">
                        <div id={trip} onClick={(e) => handleItinerary(e)} className="trip-name">{trip}</div>
                        <div  className="row-container">
                            <div className="row-items"><p className="row-label">from</p>
                            <p className="p-text">{startDate.toLocaleDateString("en-US", options)}</p></div>
                            <div className="row-items"><p className="row-label">to</p>
                            <p className="p-text">{endDate.toLocaleDateString("en-US", options)}</p></div>
                        </div>
                    </button></div>
            )
        }) 

    const checkTrips = () => {
        if (tripNames[0] === undefined) return (
            <div>
                    <div><h1 className="content">You have no trips planned</h1></div>
                    <div><button className="content form-input form-button" onClick={handleTripCreate}>Create Trip</button></div>
            </div>
        )
        return (
            <div>
                <div className="interval-div">
                    <div><button style={timeline === 'current' ? {'color': 'black'} : {'color' : 'gray'}} className="interval-button" onClick={(() => setTimeLine('current'))}>Current</button>
                    <button style={timeline === 'past' ? {'color': 'black'} : {'color' : 'gray'}}  className="interval-button past" onClick={(() => setTimeLine('past'))}>Past</button></div>
                    <div><button className="interval-button add-trip" onClick={handleTripCreate}>Add Trip +</button></div>
                </div>
                    <div className="scroll-container">{buttonList()}</div>
            </div>
        )
    };

    return (
        <div className="background-cut">
            <div className="min-width">
            <h1 className="trip-title">Trips</h1>
            {checkTrips()}
            </div>
            <Link className="link" to='/account'>account</Link>
        </div>
        )
}