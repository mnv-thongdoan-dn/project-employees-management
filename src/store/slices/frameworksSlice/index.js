import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFrameWorkGetAll } from '../../../api/frameWorks/index.js';

export const frameWorksThunk = createAsyncThunk("frameWorks/getAll", async (params, thunkApi) => {
  try {
    const res = await apiFrameWorkGetAll(params);
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const frameWorksSlice = createSlice({
  name: 'frameWorks',
  initialState: {
    isLoading: false,
    frameWorks: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(frameWorksThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(frameWorksThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    })

    .addCase(frameWorksThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default frameWorksSlice.reducer;
