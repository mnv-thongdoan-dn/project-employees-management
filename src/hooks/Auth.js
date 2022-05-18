import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginThunk } from "../store/slices/authSlice";

const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(!!user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (dataUser) => {
    const actionResult = await dispatch(LoginThunk(dataUser));
    const unwrapRes = unwrapResult(actionResult);
    if(unwrapRes) {
      localStorage.setItem('user', JSON.stringify(unwrapRes));
      setUser(unwrapRes)
      setIsLogin(true);
      navigate('/dashboard');
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/');
  }

  return { isLogin, login, logout }
}

export default useAuth;
