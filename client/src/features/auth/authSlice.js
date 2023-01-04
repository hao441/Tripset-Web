import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessionData } from '../../sessionData';
import { useSelector } from 'react-redux';

const sessionJWT = document.cookie == '' ? '' : document.cookie.match(/token=([^;]+)/)[1]
const sessionJWTExpiry = document.cookie == '' ? '' : document.cookie.match(/expires=([^;]+)/)[1]
const sessionUsername = document.cookie == '' ? '' : document.cookie.match(/username=([^;]+)/)[1]

const initialState = {
  loggedIn: false,
  sessionToken: sessionJWT,
  sessionTokenExpiry: sessionJWTExpiry,
  username: sessionUsername,
  errorMessage: '',
  trips: '',
  tripNames: [],
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload.loggedIn) state.loggedIn = action.payload.loggedIn
      if (action.payload.token) state.sessionToken = action.payload.token
      if (action.payload.tokenExpiry) state.sessionTokenExpiry = action.payload.tokenExpiry
      if (action.payload.username) state.username = action.payload.username
      if (action.payload.errorMessage) state.errorMessage = action.payload.errorMessage
    },
    logout: (state) => {
      state.loggedIn = false;
      state.sessionToken = '';
      state.sessionTokenExpiry = '';
    },
    setTrips: (state, action) => {
      state.tripNames = action.payload
    }
  },
});

export const { login, logout, setTrips } = authSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthentication = (state) => state.auth.loggedIn;
export const selectSessionToken = (state) => state.auth.sessionToken;
export const selectSessionTokenExpiry = (state) => state.auth.sessionTokenExpiry;
export const selectUserName = (state) => state.auth.username;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectUsername = (state) => state.auth.username;
export const selectTripNames = (state) => state.auth.tripNames;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
