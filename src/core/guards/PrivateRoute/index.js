import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/Auth';

export default function PrivateRoute({ children }) {
  let { isLogged } = useAuth();

  return isLogged ? children : <Navigate to={'/'}/>;
}
