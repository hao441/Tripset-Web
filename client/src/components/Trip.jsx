import React from "react";
import { Link, Navigate, redirect } from 'react-router-dom';
import CreateTrip from "./sub-components/CreateTrip";

//Redux
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/auth/authSlice';

import '../App.css'
import { useEffect } from "react";
import { useState } from "react";

export default function Trip () {
    //redux selector
    const sessionToken = useSelector(selectSessionToken);
    
    //Use States
        const [trips, setTrips] = useState([]);
        const [count, setCount] = useState(0);

    //Use Effects
        useEffect(() => {
            setTimeout((findTrips()), '10000')
        }, []);

        //[find trips function: return object and set it to a useState, no trips, set up text and button component]
        const findTrips = () => {
            
            fetch('http://localhost:9000/findtrips', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"token": sessionToken})
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res.result)
                    if (res.result) {
                        setTrips([...res.trips]);
                        console.log(trips[0])
                    } else {
                        console.log('No trips.')
                        console.log(res.message)
                    }
                })
                .catch(error => {console.log(error)
                })
            }
    //Functions
    //Find trips

    //find trips
    if (trips[0] != null) {
        return (
        <div>
            <h1>There are trips</h1>
        </div>
        )
    }
    
    return(
        <div className="page">
            <h1>Trips</h1>
            {trips[0] == null && <CreateTrip />}
        </div>
    )
}