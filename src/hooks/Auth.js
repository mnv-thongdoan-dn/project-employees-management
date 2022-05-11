import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(!!user);
  const navigate = useNavigate();

  const login = (email, password) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ email }));
        setUser({ email });
        setIsLogin(true);
        navigate('/dashboard');
        res({ email });
      }, 1000);
    });
  }
  const logout = () => {
    localStorage.removeItem('user');
    setIsLogin(false);
    navigate('/');
  }

  return { isLogin, login, logout }

}

export default useAuth;
