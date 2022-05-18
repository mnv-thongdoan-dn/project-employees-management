import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuthLogin } from "../../../api/auth/auth.api";
import Notification from '../../../components/common/Notification';

export const LoginThunk = createAsyncThunk("auth/login", async (params, thunkApi) => {
  try {
    const res = await apiAuthLogin(params);
    console.log("res", res);
    if(res.status === 200) {
      return res.data.accessToken;
    }
  } catch (error) {
    // console.log("[error]---------", error.response.data.message);
    return thunkApi.rejectWithValue(error);
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
      // console.log("[pending]---------", state)
    })

    .addCase(LoginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
      // console.log("[fulfilled]----------", action.payload)
    })

    .addCase(LoginThunk.rejected, (state) => {
      state.isLoading = false;
      Notification('error', 'Login Error Message', "Incorrect Email or Password");
      // console.log("[rejected]------------", action.error)
    })
  }
});

export default AuthSlice.reducer;
