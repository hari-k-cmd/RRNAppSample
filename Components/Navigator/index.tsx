import React from 'react';
import { AuthProvider } from './../Providers/AuthProvider';
import Routes from './../Providers/RouteProvider';

export default function Providers() {
  return (
    <AuthProvider >
      <Routes />
    </AuthProvider>
  );
}