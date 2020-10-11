import React, { useContext } from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './Dashboard';
import NotFound from './shared/NotFound';
import EditCustomer from './EditCustomer';
import Landing from './Landing';
import { AuthContext } from '../context/AuthContext';
import CreateCustomer from './CreateCustomer';

function AppRoutes() {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  return (
    <Switch>
      <PublicRoutes
        exact
        path={["/", "/login"]}
        component={Landing}
        isAuthenticated={isAuthenticated}
      />
      <ProtectedRoutes
        exact
        path="/dashboard"
        component={Dashboard}
        isAuthenticated={isAuthenticated}
      />
      <ProtectedRoutes
        exact
        path="/customer/:custId"
        component={EditCustomer}
        isAuthenticated={isAuthenticated}
      />
      <ProtectedRoutes
        exact
        path="/create"
        component={CreateCustomer}
        isAuthenticated={isAuthenticated}
      />
      <Route
        path="*"
        component={NotFound}
      />
    </Switch>
  );
}

function ProtectedRoutes({ isAuthenticated, component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated
          ? <Component {...props} />
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

function PublicRoutes({ isAuthenticated, component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(props) =>
        !isAuthenticated
          ? <Component  {...props} />
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