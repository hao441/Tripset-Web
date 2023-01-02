import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreateTrip() {

    //Use States
    const [toCreateTrip, setToCreateTrip] = useState(false);

    //functions
    const createNewTrip = () => {
        return setToCreateTrip(true)
    }

    return(
        <div>
            {toCreateTrip && <Navigate replace to="/tripcreation" />}
            <h1>No trips found</h1>
            <button onClick={createNewTrip}>Create Trip</button>
        </div>
    )
}