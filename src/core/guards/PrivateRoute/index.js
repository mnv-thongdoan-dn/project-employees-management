import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/Auth';

export default function PrivateRoute({ children }) {
  let { isLogin } = useAuth();

  console.log("isLogged-private", isLogin);

  return isLogin ? children : <Navigate to={'/'}/>;
}
