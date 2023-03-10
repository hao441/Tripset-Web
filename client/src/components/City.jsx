import React from 'react';
import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import cityLookup from '../data/cityLookUp.json'

//Redux
import { selectUserName, selectHomeCity, selectAuthentication, setReduxMessage } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

//css
import { setCityAsync } from '../features/auth/tripThunk.js';
import CityComplete from './sub-components/CityComplete.jsx';
import { ReactComponent as Loader } from '../assets/loader.svg';
import '../App.css'
import './css/city.css';


export default function City() {
    //redux
    const dispatch = useDispatch();

    const sessionUsername = useSelector(selectUserName);
    const sessionHomeCity = useSelector(selectHomeCity);
    const auth = useSelector(selectAuthentication);

    useEffect(() => {
        console.log(auth)
    })
    //use states
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    

    const userCity = (e) => {
        e.preventDefault();
        setLoading(true);
        let city = document.getElementById('cityInput').value

        let cityString = city.match(/.+(?=,)/)[0]
        let countryString = city.match(/(?=, ).+(?=\W\W\W\W\W)/)[0].replace(', ', '')

        if (cityLookup[cityString] == null) return setMessage('Please select an option.')

        if (sessionUsername === '') return console.log(`Not signed in.`)
        
        dispatch(setCityAsync({"email": sessionUsername, "city": cityString, "country": countryString, "lat": cityLookup[cityString].lat, "lng": cityLookup[cityString].lng}));
        dispatch(setReduxMessage(""));
        setLoading(false);
    }


    if (!auth) return (
        
                <Navigate to="/welcome" />
    )

    if (auth && sessionHomeCity === '') return (
        <div className="background">
            <div className='container'>
                <h1 className='lessertitle'>Welcome</h1>
                <div className='former'>
                    <br/>
                    <br/>
                    <h2>Loading...</h2>
                </div>
            </div>
        </div>
    )

    if (auth && sessionHomeCity) return (
        <Navigate replace to='/trip' />
    )

    if ((auth) && (typeof sessionHomeCity === 'undefined')) return (
        <div className="background">
            <div className='container'>
                <h1 className='lessertitle'>Welcome</h1>
                <div className='former'>
                    <div id='cityForm'>
                    <div className='top-margin'><h3>Where are you from?</h3></div>
                    <br />
                    <form autoComplete="off" onSubmit={userCity}>
                        <CityComplete />
                        <br />
                        <br />
                        <div><button type="submit" className='form-item form-button submit'>{loading ? <Loader className="spinner" /> : "Submit"}</button></div>
                        </form>
                        <h5>{message}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
} 