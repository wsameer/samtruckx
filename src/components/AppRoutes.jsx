import React, { useContext } from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import EditCustomer from './EditCustomer';
import Landing from './Landing';
import { AuthContext } from '../context/AuthContext';

function AppRoutes() {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  return (
    <Switch>
      <ProtectedLogin exact path={["/", "/login"]} component={Landing} isAuthenticated={isAuthenticated} />
      <ProtectedRoutes exact path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
      <ProtectedLogin exact path="/customer/:userId" component={EditCustomer} isAuthenticated={isAuthenticated} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function ProtectedRoutes({ isAuthenticated, component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={() =>
        isAuthenticated
          ? <Component />
          : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
      }
    />
  )
}

function ProtectedLogin({ isAuthenticated, component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={() =>
        !isAuthenticated
          ? <Component />
          : (
            <Redirect
              to={{
                pathname: '/dashboard'
              }}
            />
          )
      }
    />
  )
}

export default AppRoutes