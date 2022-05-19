import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/authSlice';
import EmployeesSlice from './slices/employeesSlice';
import positionsSlice from './slices/positionsSlice';
import languagesSlice from './slices/languagesSlice';
import frameworksSlice from './slices/frameworksSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    employees: EmployeesSlice,
    positions: positionsSlice,
    languages: languagesSlice,
    frameWorks: frameworksSlice
  },
});

export default store;
