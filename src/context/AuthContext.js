import React, { createContext, useMemo, useReducer } from 'react';
import { LOCALSTORAGE_AUTH_KEY } from '../utils/constants';

export const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function authReducer(state, action) {
  console.log(action);
  const { payload, type } = action;

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        error: '',
        isLoading: true,
        isAuthenticated: false,
        email: payload.email,
        password: payload.password
      };
    case 'LOGIN_SUCCESS': {
      const data = {
        token: payload.token,
        email: payload.email || state.email
      };
      window.localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(data));
      return {
        ...state,
        error: '',
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        email: payload.email || state.email
      };
    }
    case 'REGISTER_SUCCESS': {
      const data = {
        token: payload.token,
        email: payload.email || state.email
      };
      window.localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(data));
      return {
        ...state,
        error: '',
        isAuthenticated: true,
        isLoading: false,
        token: payload.token,
        email: payload.email || state.email
      }
    }
    case 'LOGIN_ERROR': {
      return {
        ...state,
        error: payload.message || 'Incorrect email or password!',
        isAuthenticated: false,
        isLoading: false,
        email: '',
        password: '',
        token: null
      };
    }
    case 'REGISTER_ERROR': {
      return {
        ...state,
        error: payload.message || 'Failed to register you!',
        isAuthenticated: false,
        isLoading: false,
        email: '',
        password: '',
        token: null
      };
    }
    case 'LOGOUT':
      window.localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
      return {
        ...state,
        isAuthenticated: false,
        email: '',
        password: '',
        isLoading: false,
        token: null
      }
    default:
      return state;
  }
}

const initialState = {
  isAuthenticated: false,
  email: '',
  password: '',
  isLoading: false,
  error: '',
  token: null
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // state has these values
  // const { email, password, isLoading, error, isAuthenticated, token } = state;

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider }