//React/Router/Redux
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import React from 'react';

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
import MapsLocationSearch from './sub-components/MapsLocationSearch';

//Sub-components
import TripEdit from './TripEdit';
import ItineraryEdit from './ItineraryEdit';

//Other
import { sessionData } from '../sessionData';
import { Auth } from '../features/auth/Auth';

//css
import '../index.css';

//set cookies
// sessionData();

function App() {


  const router = createBrowserRouter([
    { path: '/', element: <Counter />}, //Current working route
    { path: 'signup',element:  <SignUp /> },
    { path: 'home', element: <Home />},
    { path: 'city', element: <City /> },
    { path: 'itinerary', element: <Itinerary />},
    { path: 'account', element: <Account /> }, 
    { path: 'welcome', element: <Welcome /> },
    { path: 'mapslocationsearch', element: <MapsLocationSearch /> },
    { path: 'account', element: <Account />},
    //trips
    { path: 'tripcreation', element: <TripCreation /> },
    { path: 'trip', element: <Trips />},
    {path: 'trip/:trip/tripedit', element: <TripEdit />},
    {path: 'trip/:trip', element: <Itinerary />},
    {path: 'trip/:trip/itinerarycreation/', element: <ItineraryCreation />},
    {path: 'trip/:trip/:item/itineraryedit', element: <ItineraryEdit />},
    {path: 'auth', element: <Auth />}
  ])

  sessionData()


  return (
        <RouterProvider router={router}>
            {router.routes}
        </RouterProvider>
  );
}

export default App; 
