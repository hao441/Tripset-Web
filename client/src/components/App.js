//React/Router/Redux
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { selectAuthentication, selectTrips } from '../features/auth/authSlice';

//Components
import SignUp from './SignUp';
import Welcome from './Welcome';
import Home from './Home';
import City from './City';
import Trips from './Trips';
import TripCreation from './TripCreation';
import Itinerary from './Itinerary';
import ItineraryCreation from './ItineraryCreation';
import Account from './Account';
import Counter from './Counter';
import MapsLocationSearch from './MapsLocationSearch';

//Other
import { sessionData } from '../sessionData';
import '../index.css';

//set cookies
// sessionData();

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Counter />}, //Current working route
    { path: 'signup',element: <SignUp /> },
    { path: 'home', element: <Home />},
    { path: 'city', element: <City /> },
    { path: 'tripcreation', element: <TripCreation /> },
    { path: 'itinerary', element: <Itinerary />},
    { path: 'itinerarycreation', element: <ItineraryCreation /> },
    { path: 'account', element: <Account /> }, 
    { path: 'welcome', element: <Welcome /> },
    { path: 'mapslocationsearch', element: <MapsLocationSearch /> },
    //trips
    { path: 'trip', element: <Trips />},
    {path: 'trip/:trip', element: <Itinerary />},
    {path: 'trip/:trip/itinerary/'}
  ])

  sessionData()
  return (
    <RouterProvider router = { router } />
  );
}

export default App;
