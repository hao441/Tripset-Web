import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sessionData } from '../../sessionData';
import { useSelector } from 'react-redux';



const initialState = {
  loggedIn: false,
  sessionToken: '',
  sessionTokenExpiry: '',
  username: '',
  trips: '',
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
      state.loggedIn = action.payload.loggedIn;
      state.sessionToken = action.payload.token;
      state.sessionTokenExpiry = action.payload.tokenExpiry;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.loggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthentication = (state) => state.auth.loggedIn;
export const selectSessionToken = (state) => state.auth.sessionToken
export const selectSessionTokenExpiry = (state) => state.auth.sessionTokenExpiry
export const selectUserName = (state) => state.auth.username


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
