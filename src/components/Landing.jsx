import React, { useState } from 'react';
import * as appApi from '../utils/api-handlers';
import { AuthContext } from '../context/AuthContext'
import { LOGIN, REGISTER } from '../utils/constants';
import { AlertMessage, Footer } from './shared';
import Login from './Login';

function Landing() {
  const { state, dispatch } = React.useContext(AuthContext);
  const { isLoading, error } = state;

  const [selection, setSelection] = useState(LOGIN);

  async function login({ email, password }) {
    // API call
    dispatch({ type: 'LOGIN', payload: { email: email, password: password } });

    try {
      const response = await appApi.loginApi({ email, password });
      if (response.error) {
        throw Error(response.error);
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error });
    }
  }

  async function register({ email, password }) {
    // API call
    dispatch({ type: 'LOGIN', payload: { email: email, password: password } });
    try {
      const response = await appApi.registerApi({ email, password });
      if (response.error) {
        throw Error(response.error);
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error });
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-5">Sam-TruckX</h1>

          {error && <AlertMessage type={'danger'} message={'Invalid Email or Password!'} />}

          {selection === LOGIN && (
            <>
              <h3 className="text-center mb-4">{LOGIN}</h3>
              <Login
                onSubmitHandler={login}
                buttonText={isLoading ? 'Logging in...' : LOGIN}
              />
              <hr />
              <p className="text-right">
                Don't have an account?
                <button
                  type="button"
                  className="btn btn-link pt-0"
                  onClick={(e) => setSelection(REGISTER)}>
                  {REGISTER}
                </button>
              </p>
            </>
          )}
          {selection === REGISTER && (
            <>
              <h3 className="text-center mb-4">{REGISTER}</h3>
              <Login
                onSubmitHandler={register}
                buttonText={isLoading ? 'Registering in...' : REGISTER}
              />
              <hr />
              <p className="text-right">
                Have an account?
                <button
                  type="button"
                  className="btn btn-link pt-0"
                  onClick={(e) => setSelection(LOGIN)}>
                  {LOGIN}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
