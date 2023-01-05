//React/Router/Redux
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';

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
import MapsLocationSearch from './components/MapsLocationSearch';

//Other
import { sessionData } from './sessionData';
import './index.css';

//set cookies
sessionData();

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
  { path: 'mapslocationsearch', element: <MapsLocationSearch /> },
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


// if (sessionAuth === '') sessionData()

// store.getState().auth.loggedIn === ''




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
