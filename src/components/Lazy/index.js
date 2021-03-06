import React from 'react';

export const Login = React.lazy(() => import('../../pages/Login'));
export const Dashboard = React.lazy(() => import('../../pages/Dashboard'));
export const NotFount = React.lazy(() => import('../../pages/404'));
export const Chart = React.lazy(() => import('../Chart'));
export const EmployeesRouter = React.lazy(() => import('../../pages/Dashboard/Feature/Employees'));
export const Employees = React.lazy(() => import('../Employees/Employees'));
export const CreateEmployee = React.lazy(() => import('../Employees/CreateEmployees'));
export const EditEmployee = React.lazy(() => import('../Employees/EditEmployees'));
