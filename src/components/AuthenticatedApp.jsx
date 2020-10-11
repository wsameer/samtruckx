import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import AppRoutes from './AppRoutes';
import Navbar from './Navbar';

function AuthenticatedApp() {
  return (
    <DashboardProvider>
      <Navbar />
      <AppRoutes />
    </DashboardProvider>
  )
}

export default AuthenticatedApp
