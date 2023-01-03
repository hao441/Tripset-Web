import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logout,
  login,
  selectAuthentication,
  selectSessionToken,
  selectUserName
} from './authSlice';
import { store } from '../../app/store';
import styles from './Auth.module.css';

export function Auth() {
  const auth = useSelector(selectAuthentication);
  
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
        <span className={styles.value}>{`${auth}`}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(login({loggedIn: true, token: '', tokenExpiry: '', username: ''}))}
        >
          Login
        </button>
      </div>
    </div>
  );
}
