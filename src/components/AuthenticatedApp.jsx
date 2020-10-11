import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import { Navbar, Footer } from './shared';
import AppRoutes from './AppRoutes';

function AuthenticatedApp() {
  return (
    <DashboardProvider>
      <Navbar />
      <AppRoutes />
      <Footer />
    </DashboardProvider>
  )
}

export default AuthenticatedApp
