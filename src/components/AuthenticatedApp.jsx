import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import AppRoutes from './AppRoutes';

function AuthenticatedApp() {
  return (
    <DashboardProvider>
      <AppRoutes />
    </DashboardProvider>
  )
}

export default AuthenticatedApp
