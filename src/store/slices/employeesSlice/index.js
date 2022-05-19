import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiEmployeesGetList, apiEmployeesCreate } from '../../../api/employees/employees.api';

export const EmployeesGetListThunk = createAsyncThunk("employees/getAll", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesGetList();
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const EmployeesCreateThunk = createAsyncThunk("employees/create", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesCreate(params);
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const EmployeesSlice = createSlice({
  name: 'employees',
  initialState: {
    isLoading: false,
    employees: [],
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {

    // get list
    builder.addCase(EmployeesGetListThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(EmployeesGetListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    })

    .addCase(EmployeesGetListThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

    //  create
    .addCase(EmployeesCreateThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(EmployeesCreateThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees.push(action.payload);
    })

    .addCase(EmployeesCreateThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

  }
});

export default EmployeesSlice.reducer;
