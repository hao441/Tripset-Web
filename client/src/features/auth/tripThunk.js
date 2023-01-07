import { createAsyncThunk } from '@reduxjs/toolkit';

export const setCityAsync = createAsyncThunk(
    'auth/setCity',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('http://localhost:9000/setcity', {
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
        const response = await fetch('http://localhost:9000/settrip', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email: payload.email, tripName: payload.tripName, location: payload.location, startDate: payload.startDate, endDate: payload.endDate})
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)
