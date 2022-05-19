import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiPositionGetAll } from '../../../api/positions/positions.api';

export const positionsThunk = createAsyncThunk("positions/getAll", async (params, thunkApi) => {
  try {
    const res = await apiPositionGetAll();
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const positionsSlice = createSlice({
  name: 'positions',
  initialState: {
    isLoading: false,
    positions: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(positionsThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(positionsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    })

    .addCase(positionsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default positionsSlice.reducer;
