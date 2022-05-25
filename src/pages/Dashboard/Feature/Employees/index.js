import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Employees, CreateEmployee, EditEmployee } from '../../../../components/Lazy';

const EmployeesRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Employees/>}/>
      <Route path='create' element={<CreateEmployee/>}/>
      <Route path='edit' element={<EditEmployee/>}/>
    </Routes>
  )
}

export default EmployeesRouter;
