import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Check if the user is authenticated (you may implement your own logic)
  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
