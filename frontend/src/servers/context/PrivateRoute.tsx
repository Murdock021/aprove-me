/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  element: React.ReactElement;
  scope?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, scope }) => {
  const { user, loading } = useAuth();

  console.log('PrivateRoute rendered');
  console.log('loading:', loading);
  console.log('user:', user);
  console.log('scope:', scope);

  if (loading) {
    return <>Carregando...</>;
  }

  if (!user) {
    console.log('No user found, redirecting to login...');
    return <Navigate to={!!scope ? `/${scope}/login` : `/`} replace />;
  }

  return element;
};

export default PrivateRoute;

