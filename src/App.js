import React, { Suspense } from "react";
import './assets/scss/styles.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./core/guards/PrivateRoute";
import { Login, Dashboard, NotFount } from './components/Lazy'
 
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/dashboard/*" 
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFount/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
