import { createSlice } from '@reduxjs/toolkit';
import { loadUserAsync, signinAsync, signupAsync, deleteAccountAsync } from './authThunk';
import { setCityAsync, setTripAsync, setItineraryAsync, deleteItineraryItemAsync, deleteTripAsync } from './tripThunk';

const sessionJWT = document.cookie === '' ? '' : document.cookie.match(/token=([^;]+)/)[1]
const sessionJWTExpiry = document.cookie === '' ? '' : document.cookie.match(/expires=([^;]+)/)[1]
const sessionUsername = document.cookie === '' ? '' : document.cookie.match(/username=([^;]+)/)[1]

let loginStatus;
let token;
let tokenExpiry;
let username;

if (sessionJWT !== '' && sessionJWTExpiry !== '' && sessionUsername !== '') {
  loginStatus = true; token = sessionJWT; tokenExpiry = sessionJWTExpiry; username = sessionUsername;
} else {
  loginStatus = false; token = ''; tokenExpiry = ''; username = '';
}

const initialState = {
  loggedIn: loginStatus,
  sessionToken: token,
  sessionTokenExpiry: tokenExpiry,
  username: username,
  name: '',
  message: '',
  homeCity: '',
  trips: '',
  tripNames: [],
  res: '',
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
      if (action.payload.email) state.email = action.payload.username
      if (action.payload.message) state.message = action.payload.message
      
    },
    logout: (state) => {
      state.loggedIn = false;

      document.cookie = `path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

      state.sessionToken = '';
      state.sessionTokenExpiry = '';
      state.sessionUsername = '';
      state.sessionMessage = '';
    },
    setMessage: (state, action) => {
      state.message = action.payload.message
    },
    setTrips: (state, action) => {
      state.tripNames = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    //loaduser builder
      .addCase(loadUserAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.homeCity = action.payload.homeCity;
        state.trips = action.payload.trips;
        state.tripNames = action.payload.tripNames;
        state.message = action.payload.message;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
    //signin builder
      .addCase(signinAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signinAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = action.payload.result;
        state.sessionToken = action.payload.token;
        state.sessionTokenExpiry = action.payload.tokenExpiry;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.message = action.payload.message;
        state.trips = action.payload.trips;
        state.homeCity = action.payload.homeCity;

        if (action.payload.result) {
          document.cookie = `path=/;`;
          document.cookie = `expires=${action.payload.tokenExpiry};`;
          document.cookie = `token=${action.payload.token};`;
          document.cookie = `username=${action.payload.email};`;
        }
      })
      .addCase(signinAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //signup builder
      .addCase(signupAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = action.payload.result;
        state.sessionToken = action.payload.token;
        state.sessionTokenExpiry = action.payload.tokenExpiry;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.message = action.payload.message;
        state.homeCity = undefined;

        if (action.payload.result) {
          document.cookie = `path=/;`;
          document.cookie = `expires=${action.payload.tokenExpiry};`;
          document.cookie = `token=${action.payload.token};`;
          document.cookie = `username=${action.payload.email};`;
        }
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //Delete account builder
      .addCase(deleteAccountAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteAccountAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result;
        state.loggedIn = !action.payload.result;
        state.message = action.payload.message;

        if (action.payload.result) {
          document.cookie = `path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
          document.cookie = `expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
      })
      .addCase(deleteAccountAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //city builder
      .addCase(setCityAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setCityAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result
        state.homeCity = action.payload.homeCity;
        state.message = action.payload.message;
      })
      .addCase(setCityAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //trip builder
      .addCase(setTripAsync.pending, (state, action) => {
        state.status = 'loading';
      }
      )
      .addCase(setTripAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result;
        state.trips = action.payload.result ? action.payload.trips : state.trips;
        state.message = action.payload.message;
      })
      .addCase(setTripAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      .addCase(deleteTripAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteTripAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result;
        state.trips = action.payload.result ? action.payload.trips : state.trips;
        state.message = action.payload.message;
      })
      .addCase(deleteTripAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //Itinerary Create Builder
      .addCase(setItineraryAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setItineraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result;
        state.trips = action.payload.result ? action.payload.trips : state.trips;
        state.message = action.payload.message;
      })
      .addCase(setItineraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
      //Itinerary Delete Builder
      .addCase(deleteItineraryItemAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteItineraryItemAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.res = action.payload.result
        state.trips = action.payload.result ? {...action.payload.trips} : state.trips;
        state.message = action.payload.message;
        state.res = action.payload.result
        state.message = action.payload.message;
      })
      .addCase(deleteItineraryItemAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.payload.message;
      })
  }
});

export const { login, logout, setMessage, setTrips, setTripsTwo } = authSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthentication = (state) => state.auth.loggedIn;
export const selectSessionToken = (state) => state.auth.sessionToken;
export const selectSessionTokenExpiry = (state) => state.auth.sessionTokenExpiry;
export const selectUserName = (state) => state.auth.username;
export const selectMessage = (state) => state.auth.message;
export const selectRes = (state) => state.auth.res;
export const selectUsername = (state) => state.auth.username;
export const selectHomeCity = (state) => state.auth.homeCity;
export const selectTrips = (state) => state.auth.trips;
export const selectTripNames = (state) => state.auth.tripNames;
export const selectName = (state) => state.auth.name;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
