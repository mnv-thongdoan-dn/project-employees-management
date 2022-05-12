import React, { Suspense } from "react";
import './assets/scss/styles.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./core/guards/PrivateRoute";
 
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Notfount = React.lazy(() => import('./pages/404'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Notfount/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
