import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style.css';
import { LOCALSTORAGE_AUTH_KEY } from '../utils/constants';
import FullPageSpinner from './FullPageSpinner';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp'),
)
const Landing = React.lazy(() => import('./Landing'))

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    // if user in found in localstorage
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || null);
    if (user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: user.token,
          email: user.email
        }
      });
    }
  }, [])


  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {isAuthenticated ? <AuthenticatedApp /> : <Landing />}
    </React.Suspense>
  );
}

export default App;
