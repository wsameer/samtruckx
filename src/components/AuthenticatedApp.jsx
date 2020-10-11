import React from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { DashboardProvider } from '../context/DashboardContext';
import { Navbar, Footer, FullPageErrorFallback } from './shared';
import AppRoutes from './AppRoutes';

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <DashboardProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </DashboardProvider>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
