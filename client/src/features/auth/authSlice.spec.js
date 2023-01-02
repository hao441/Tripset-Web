import counterReducer, {
    login,
    logout
  } from './authSlice';
  
  describe('auth reducer', () => {
    const initialState = {
      loggedIn: true,
      status: 'idle',
    };
    it('should handle initial state', () => {
      expect(authReducer(undefined, { type: 'unknown' })).toEqual({
        loggedOut: false,
        status: 'idle',
      });
    });
  
    it('should handle increment', () => {
      const actual = authReducer(initialState, login());
      expect(actual.loggedIn).toEqual(true);
    });
  
    it('should handle decrement', () => {
      const actual = authReducer(initialState, logout());
      expect(actual.loggedIn).toEqual(false);
    });
  
    it('should handle incrementByAmount', () => {
      const actual = counterReducer(initialState, incrementByAmount(2));
      expect(actual.value).toEqual(5);
    });
  });
  