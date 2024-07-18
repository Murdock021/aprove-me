/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  roles: string[];
  element: React.ReactElement;
  scope?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles, element, scope }) => {
  const { user, loading } = useAuth();

  console.log("PrivateRoute rendered");
  console.log("loading:", loading);
  console.log("user:", user);
  console.log("roles:", roles);
  console.log("scope:", scope);

  if (loading) {
    return <>Carregando...</>;
  }

  if (!user) {
    console.log("No user found, redirecting to login...");
    return <Navigate to={!!scope ? `/${scope}/login` : `/`} replace />;
  }

  // Permitir acesso se não há roles requeridas ou se o usuário tem uma das roles requeridas
  if (roles.length === 0 || user.roles.length === 0 || roles.some(role => user.roles.includes(role))) {
    return element;
  }

  console.log("User does not have required roles, redirecting to home...");
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
