import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../style.css';
import { LOCALSTORAGE_AUTH_KEY } from '../utils/constants';
import FullPageSpinner from './FullPageSpinner';

const Dashboard = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Dashboard'),
)
const Landing = React.lazy(() => import('./Landing'))

function App() {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    console.log(state);
    // if user in found in localstorage
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || null);
    console.log(user);
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
      {isAuthenticated ? <Dashboard /> : <Landing />}
    </React.Suspense>
  );
}

export default App;
