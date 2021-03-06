import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/Auth';

export default function PrivateRoute({ children }) {
  let { isLogin } = useAuth();

  return isLogin ? children : <Navigate to={'/'}/>;
}
