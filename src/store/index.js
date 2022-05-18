import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/authSlice'

const store = configureStore({
  reducer: {
    auth: AuthSlice
  },
});

export default store;
