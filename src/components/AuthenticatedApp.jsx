import React from 'react';
import { DashboardProvider } from '../context/DashboardContext';
import AppRoutes from './AppRoutes';
import Footer from './Footer';
import Navbar from './Navbar';

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
