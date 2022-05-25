import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Notification from '../../../components/common/Notification';
import { apiAuthLogin } from "../../../api/auth/auth.api";

export const LoginThunk = createAsyncThunk("auth/login", async (params, thunkApi) => {
  try {
    const res = await apiAuthLogin(params);
    return res.data.accessToken;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}) ;

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    token: null,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(LoginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    })

    .addCase(LoginThunk.rejected, (state, action) => {
      state.isLoading = false;
      Notification('error', `Error ${action.payload.status}`, action.payload.message);
    })
  }
});

export default AuthSlice.reducer;
