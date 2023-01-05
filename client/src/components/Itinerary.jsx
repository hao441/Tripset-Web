//imports
import React, {useState, useEffect} from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";

//css
import '../App.css'
import './css/trip.css'

//Other
import { findItinerary } from "../fetchTrips";

export default function Trip() {

    //navigate
    const navigate = useNavigate()

    //useParams
    let { trip } = useParams(); 

    //functions
    const [code, setCode] = useState(null);

    async function findI() {let [outcome, code] = await findItinerary(trip); setCode(code) }

    useEffect(() => {
        findI()
    }, [])
    
    switch (code) {
        case 0:
            return (<div className="page"><h1>case 0</h1></div>)
            break;
        case 1:
            return (<div className="page"><h1>Trip not found</h1><Link to='/trip'>Go back to Trips.</Link></div>)
            break;
        case 2:
            return (<div className="page"><h1>{trip}</h1><h5>No itinerary Found.</h5><button onClick={(() => navigate('/itinerarycreation'))}>Create Itinerary</button></div>)
            break;
        case null:
            return (<div></div>)
            break;
    }

    return (
        <div className="page">
            <h1 className="trip-itinerary-title">{trip}</h1>
            <ul>
                {trip}
                <li>Itinerary Item 1</li>
                <li>Itinerary Item 2</li>
                <li>Itinerary Item 3</li>
                <li>Itinerary Item 4</li>
            </ul>
        </div>
    )
}