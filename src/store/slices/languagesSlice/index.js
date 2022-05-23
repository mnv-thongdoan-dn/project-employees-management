import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLanguagesGetAll } from '../../../api/languages/languages.api';

export const languagesThunk = createAsyncThunk("languages/getAll", async (thunkApi) => {
  try {
    const res = await apiLanguagesGetAll();
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    isLoading: false,
    languages: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(languagesThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(languagesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.languages = action.payload;
    })

    .addCase(languagesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })
  }
});

export default languagesSlice.reducer;
