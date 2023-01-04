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
import Trips from './components/Trips';
import TripCreation from './components/TripCreation';
import Itinerary from './components/Itinerary';
import ItineraryCreation from './components/ItineraryCreation';
import Account from './components/Account';
import Counter from './components/Counter';


//Reports
import reportWebVitals from './reportWebVitals';

//CSS
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Counter />}, //Current working route
  { path: 'signup',element: <SignUp /> },
  { path: 'home', element: <Home />},
  { path: 'city', element: <City /> },
  { path: 'tripcreation', element: <TripCreation /> },
  { path: 'itinerary', element: <Itinerary /> },
  { path: 'itinerarycreation', element: <ItineraryCreation /> },
  { path: 'account', element: <Account /> },  
  { path: 'welcome', element: <Welcome /> },
  //trips
  { path: 'trip', element: <Trips />},
  {path: 'trip/:trip', element: <Itinerary />},
  // {path: 'trip/:trip/itinerary/:itinerary'}
])

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
