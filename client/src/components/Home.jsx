import React from 'react';
import { Link, Route } from 'react-router-dom';

//Redux
import { selectSessionToken } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthentication, login } from '../features/auth/authSlice';

import '../App.css'

export default function Home () {
        const dispatch = useDispatch();

        let auth = useSelector(selectAuthentication);

        return (
            <div className="page">
                <h1>Auth is: {`${auth}`}</h1>

                <button onClick={(() => dispatch(login({loggedIn: true, token: '', tokenExpiry: '', username: ''})))}></button>

                <Link to={`/`}>Go to Counter</Link>
               <h1>Home Page</h1>
           </div>
        );
    }