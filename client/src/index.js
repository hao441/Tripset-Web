//React
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Route, redirect} from 'react-router-dom';


//Redux
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync, selectSessionTokenExpiry, selectSessionToken } from './features/auth/authSlice';

//Components
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import Home from './components/Home';
import City from './components/City';
import Trip from './components/Trip';
import TripCreation from './components/TripCreation';
import Itinerary from './components/Itinerary';
import ItineraryCreation from './components/ItineraryCreation';
import Account from './components/Account';
import Counter from './components/Counter';


//Reports
import reportWebVitals from './reportWebVitals';

//CSS
import './index.css'

let sessionJWT = document.cookie == '' ? '' : document.cookie.match(/token=(\S+)/)[0].replace('token=','')
let sessionJWTExpiry = document.cookie == '' ? '' : document.cookie.match(/expires=([^;]+)/)[0].replace('expires=','')

let currentDate = new Date(Date.now());
let expiryDate = new Date(sessionJWTExpiry);

let router = createBrowserRouter([
  { path: '/', element: <Counter />, errorElement: <Welcome />}, //Current working route
  { path: 'welcome', element: <Welcome /> },
  { path: 'signup',element: <SignUp /> }
]);

if (sessionJWT !== '' && sessionJWTExpiry !== '' && currentDate < expiryDate) {
  router = createBrowserRouter([
    { path: '/', element: <Counter />, errorElement: <Welcome />}, //Current working route
    { path: 'signup',element: <SignUp /> },
    { path: 'home', element: <Home />},
    { path: 'city', element: <City /> },
    { path: 'trip', element: <Trip /> },
    { path: 'tripcreation', element: <TripCreation /> },
    { path: 'itinerary', element: <Itinerary /> },
    { path: 'itineraryCreation', element: <ItineraryCreation /> },
    { path: 'account', element: <Account /> },  
    { path: 'welcome', element: <Welcome /> }
  ])
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<Provider store={store}>
        <RouterProvider router = { router } />
	</Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
