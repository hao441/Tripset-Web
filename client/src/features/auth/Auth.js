import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logout,
  login,
  loginAsync,
  selectAuthentication,
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
          onClick={() => dispatch(login())}
        >
          Login
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(loginAsync())}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
