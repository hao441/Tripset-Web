import React from "react";
import { Link, Navigate } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux';
import { selectSessionToken } from '../features/auth/authSlice';

import '../App.css'

export default function ItineraryCreation () {

    return(
        <div className="page">
            <h1>Itinerary Creation</h1>
        </div>
    )
}