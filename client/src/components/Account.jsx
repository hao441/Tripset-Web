import React, {useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { store } from "../app/store";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuthentication, selectHomeCity, selectMessage, selectName, selectTrips, selectUserName, setReduxMessage } from '../features/auth/authSlice';

//Other
import { deleteAccountAsync } from "../features/auth/authThunk";
import '../App.css'
import './css/tripcreation.css'

const TripEdit = () => {

    //redux/react-router
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const sessionUsername = useSelector(selectUserName);
    const sessionName = useSelector(selectName);
    const sessionMessage = useSelector(selectMessage);
    const trips = useSelector(selectTrips);
    const sessionHomeCity = useSelector(selectHomeCity);
    const auth = useSelector(selectAuthentication);

    useEffect(() => {
        store.dispatch(setReduxMessage(""));
    }, [])
    
    const handleTripsNav = () => {
        return navigate('/trip')
    }

    if (!auth) return (
        <Navigate to="/welcome" />
    )
    
    return(
        <div className="background">
            <div className="container">
                <div><h1 className="halftitle">Account</h1></div>
                {/* content */}
                <div className="former top-margin">
                        <h1 className="minortitle">Account Username:</h1> {sessionUsername}
                        <h1 className="minortitle">First Name:</h1> {!sessionName? 'No name set.' : sessionName}
                        <h1 className="minortitle">Home City:</h1> {`${sessionHomeCity['city']}, ${sessionHomeCity['country']}`}
                        <h1 className="minortitle">Trips:</h1> <p> {!trips ? 'No Trips to show.' : Object.keys(trips).map(((key, index) => index !== Object.keys(trips).length-1 ? `${key}, ` : `${key}`))}</p>
                        <br />
                        <br />
                        
                        <div><button className="form-item form-button" onClick={() => handleTripsNav()}>Back to Trips</button></div>
                    <hr className="hor" />
                    <div><button className="form-item form-button signup" onClick={() => {dispatch(logout()); return navigate('/')}}>Logout</button></div>
                    <div><button className="form-item form-button signup" style={{'backgroundColor':'darkred'}} onClick={() => {dispatch(deleteAccountAsync(sessionUsername)); dispatch(logout()); return navigate('/')}}>Delete Account</button></div>
                    <p style={{'color' : 'crimson'}}>{sessionMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default TripEdit;