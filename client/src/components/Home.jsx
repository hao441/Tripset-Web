import React, { useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, selectSessionToken, selectSessionTokenExpiry, login } from '../features/auth/authSlice';

import '../App.css'

export default function Home () {
        let auth = useSelector(selectAuthentication);
        let token = useSelector(selectSessionToken);
        let tokenExpiry = useSelector(selectSessionTokenExpiry);

        if (!auth) return (
            <Navigate replace to="/welcome" />
        );

        return (
            <div className="page">
                <h1>Auth is: {`${auth}`}</h1>
                <h1>Token is: {`${token}`}</h1>
                <h1>Token Expiry is: {`${tokenExpiry}`}</h1>
                <Link to={`/`}>Go to Counter</Link>
               <h1>Home Page</h1>
           </div>
        );
    }