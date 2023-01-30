import { useSelector, useDispatch } from 'react-redux';
import {
  logout,
  login,
  selectAuthentication,
} from './authSlice';
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
