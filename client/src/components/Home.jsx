import React from 'react';
import { Link, Navigate } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux';
import { selectAuthentication, selectSessionToken, selectSessionTokenExpiry, selectMessage, selectRes, selectUserName, selectHomeCity, selectTrips } from '../features/auth/authSlice';

import '../App.css'
import { store } from '../app/store';

export default function Home () {
        const auth = useSelector(selectAuthentication);
        const token = useSelector(selectSessionToken);
        const tokenExpiry = useSelector(selectSessionTokenExpiry);
        const message = useSelector(selectMessage);
        const res = useSelector(selectRes);
        const username = useSelector(selectUserName);
        const homeCity = useSelector(selectHomeCity);
        const trips = useSelector(selectTrips);
        
        console.log(store.getState().auth)
        

        if (!auth) return (
            <Navigate to="/welcome" />
        );

        return (
            <div className="page-100">
                <h1><u>Home Page</u></h1>
                <h2>Auth is: {`${auth}`}</h2>
                <h3>Token is: {token.match(/.{50}/) + '...'}</h3>
                <h3>Token Expiry is: {`${tokenExpiry}`}</h3>
                <h3>Message is: {`${message}`}</h3>
                <h3>Res is: {`${res}`}</h3>
                <h3>Username is: {`${username}`}</h3>
                <h3>Home City is: {`${homeCity}`}</h3>
                <h3>Trips is: {`${Object.keys(trips)}`}</h3>
                <Link to={`/`}>Go to Counter</Link>
               
           </div>
        );
    }