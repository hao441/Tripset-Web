import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUserAsync = createAsyncThunk(
    'auth/loadUser',
    async (payload, { rejectWithValue }) => {
      try {
      const response = await fetch('https://tripset-266676c2904e.herokuapp.com/loaduser', {
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
      const response = await fetch('https://tripset-266676c2904e.herokuapp.com/signin', {
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
        const response = await fetch('https://tripset-266676c2904e.herokuapp.com/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"name": payload.name, "email": payload.email, "password": payload.password, "confirmPassword": payload.confirmPassword})
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)

export const deleteAccountAsync = createAsyncThunk(
    'auth/deleteAccount',
    async (payload, { rejectWithValue }) => {
        try {
        const response = await fetch('https://tripset-266676c2904e.herokuapp.com/deleteaccount', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"email": payload})
        })
        const data = await response.json()
        return data
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)
