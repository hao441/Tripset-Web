import { createAsyncThunk } from '@reduxjs/toolkit';

export const setCityAsync = createAsyncThunk(
    'auth/setCity',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/setcity', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": payload.email, "city": payload.city, "country": payload.country, "lat": payload.lat, "lng": payload.lng})
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const setTripAsync = createAsyncThunk(
    'auth/setTrip',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/settrip', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: payload.email, 
                tripName: payload.tripName,
                trip: payload.trip
            })
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const deleteTripAsync = createAsyncThunk(
    'auth/deleteTrip',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/deletetrip', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: payload.email,
                tripName: payload.tripName
            })
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const setItineraryAsync = createAsyncThunk(
    'auth/setItinerary',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/setitinerary', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: payload.email,
                tripName: payload.tripName,
                itineraryName: payload.itineraryName,
                itinerary: payload.itinerary
            })
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const updateItineraryItemAsync = createAsyncThunk(
    'auth/updateItineraryItem',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/updateItineraryItem', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: payload.email,
                tripName: payload.tripName,
                currentItineraryName: payload.currentItineraryName,
                newItineraryName: payload.newItineraryName,
                itinerary: payload.itinerary
            })
        })
        const data = await response.json();
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const deleteItineraryItemAsync = createAsyncThunk(
    'auth/deleteItineraryItem',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset.herokuapp.com/deleteitineraryitem', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: payload.email,
                tripName: payload.tripName,
                itineraryName: payload.itineraryName
            })
        })
        const data = await response.json();
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)
