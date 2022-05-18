import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/Auth';

export default function PrivateRoute({ children }) {
  let { isLogged } = useAuth();

  return 11 == 11 ? children : <Navigate to={'/'}/>;
}
