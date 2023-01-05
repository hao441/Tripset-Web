import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUserAsync = createAsyncThunk(
    'auth/loadUser',
    async (payload, { rejectWithValue }) => {
      try {
      const response = await fetch('http://localhost:9000/loadUser', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"token": payload})
      })
      const data = await response.json()
      return data
      } catch (error) {
        rejectWithValue(error.response.data);
      }
    }
  )

export const signinAsync = createAsyncThunk(
    'auth/signin',
    async (payload, { rejectWithValue }) => {
      try {
      const response = await fetch('http://localhost:9000/signin', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"email": payload.email, "password": payload.password})
      })
      const data = await response.json()
      return data
      } catch (error) {
        rejectWithValue(error.response.data);
      }
    }
  )

export const signupAsync = createAsyncThunk(
    'auth/signup',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('http://localhost:9000/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": payload.email, "password": payload.password, "confirmPassword": payload.confirmPassword})
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)
