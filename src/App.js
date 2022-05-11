import React, { Suspense } from "react";
import './assets/scss/styles.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./core/guards/PrivateRoute";
 
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } 
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
