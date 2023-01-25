import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuthentication, selectHomeCity, selectMessage, selectName, selectSessionToken, selectTripNames, selectTrips, selectUserName } from '../features/auth/authSlice';


import '../App.css'
import './css/tripcreation.css'
import { deleteAccountAsync } from "../features/auth/authThunk";

const TripEdit = () => {

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionToken = useSelector(selectSessionToken);
    const sessionUsername = useSelector(selectUserName);
    const sessionName = useSelector(selectName);
    const sessionMessage = useSelector(selectMessage);
    const trips = useSelector(selectTrips);
    const sessionHomeCity = useSelector(selectHomeCity);
    const auth = useSelector(selectAuthentication);
    const name = useSelector(selectName);

    const [message, setMessage] = useState(sessionMessage);

    let mappedTrips;

    useEffect(() => {
        mappedTrips = !trips ? '' : Object.keys(trips);
    })

    

    const deleteAccount = () => {
        return dispatch(deleteAccountAsync(sessionUsername));
    }

    const handleTripsNav = () => {
        return navigate('/trip')
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Account</h1></div>
                {/* content */}
                <div className="former top-margin">
                        <h1 className="minortitle">Account Username:</h1> {sessionUsername}
                        <h1 className="minortitle">First Name:</h1> {!sessionName? 'No name set.' : sessionName}
                        <h1 className="minortitle">Home City:</h1> {`${sessionHomeCity['city']}, ${sessionHomeCity['country']}`}
                        <h1 className="minortitle">Trips:</h1> <p> {!trips ? 'No Trips to show.' : Object.keys(trips).map(((key, index) => index != Object.keys(trips).length-1 ? `${key}, ` : `${key}`))}</p>
                        <br />
                        <br />
                        
                        <div><button className="form-item form-button" onClick={() => handleTripsNav()}>Back to Trips</button></div>
                    <hr className="hor" />
                    <div><button className="form-item form-button signup" onClick={() => {dispatch(logout()); return navigate('/')}}>Logout</button></div>
                    <div><button className="form-item form-button signup" style={{'backgroundColor':'darkred'}} onClick={() => deleteAccount()}>Delete Account</button></div>
                    <p style={{'color' : 'crimson'}}>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default TripEdit;