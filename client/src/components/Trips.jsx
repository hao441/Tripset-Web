//React
import React, { useState, useEffect} from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import CreateTrip from "./sub-components/CreateTrip";

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectSessionToken, setTrips } from '../features/auth/authSlice';

//css
import '../App.css'
import './css/trip.css'

export default function Trip () {
    //redux selector
    const sessionToken = useSelector(selectSessionToken);

    //Use States
        const [trips, setTrips] = useState([]);
        const [empty, setEmpty] = useState(false);

    //Use Effects
        useEffect(() => {
            findTrips()
        }, []);

    //react router
    const navigate = useNavigate()

        //[find trips function: return object and set it to a useState, no trips, set up text and button component]
        const findTrips = () => {
            
            fetch('http://localhost:9000/findtrips', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"token": sessionToken})
                })
                .then(res => res.json())
                .then(res => {
                    if (res.result) {
                        const tripTitles = [];

                        for (const key in res.trips) {
                            tripTitles.push(key);
                        }
                        setTrips(tripTitles)
                        setEmpty(false)
                    } else {
                        console.log('No trips.')
                        setEmpty(true)
                    }
                })
                .catch(error => {console.log(error)
                })
            }
    //Functions

    const showTrips = trips.map((trip) => {
        return <button key={trip.toString} className='page' onClick={() => navigate(`${trip}`)}>{trip}</button>
    })

    //Find trips
    if (empty === null) return (
        <div>
        </div>
    )

    //find trips
    if (empty === false) {
        return (
        <div className="page">
            <h1>There are trips</h1>
            {showTrips}
        </div>
        )
    }
    return(
        <div className="page">
            <h1>Trips</h1>
            <h1>{`showtrips: ${showTrips == ''}`}</h1>
            {trips[0] == null && <CreateTrip />}
        </div>
    )
}