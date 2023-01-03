import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import { Auth } from '../features/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../app/store';
import { login, selectAuthentication } from '../features/auth/authSlice';
import { sessionData } from '../sessionData';
import '../App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Welcome from './Welcome';


function App() {

  let auth = useSelector(selectAuthentication)

  //react router
  const navigate = useNavigate()
  
  //react
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    if (auth === '') sessionData()
    setLogged(auth)
  }, [])
  
  //testing
  

  //checkAuth
  // console.log(checkAuth())
  // if (!checkAuth()) { return <Navigate replace to={`/welcome`} /> }
  if (!logged) return (
    <Navigate replace to='/welcome' />
  )


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Auth />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
