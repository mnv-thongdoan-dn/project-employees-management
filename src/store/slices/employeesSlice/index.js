import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { 
  apiEmployeesGetList, 
  apiEmployeesCreate, 
  apiEmployeesDelete 
} from '../../../api/employees/employees.api';

export const EmployeesGetListThunk = createAsyncThunk("employees/getAll", async (params, thunkApi) => {
  console.log("params-thunk-getall", params);
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
});

export const EmployeesDeleteThunk = createAsyncThunk("employees/delete", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesDelete(params);
    if(res.status === 200) {
      thunkApi.dispatch(EmployeesGetListThunk(123))
      // const result = await thunkApi.dispatch(EmployeesGetListThunk());
      // console.log("result-thunk",unwrapResult(result));
      // return unwrapResult(result);
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    // get list
    builder.addCase(EmployeesGetListThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(EmployeesGetListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(" action.payload employees", action.payload)
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

    //  delete
    .addCase(EmployeesDeleteThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(EmployeesDeleteThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.employees = action.payload;
    })

    .addCase(EmployeesDeleteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

  }
});

export default EmployeesSlice.reducer;
