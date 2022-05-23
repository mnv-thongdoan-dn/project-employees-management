import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  apiEmployeesGetList, 
  apiEmployeesCreate, 
  apiEmployeesDelete,
  apiEmployeesUpdate,
  apiEmployeeGetItem
} from '../../../api/employees/employees.api';

export const employeesGetListThunk = createAsyncThunk("employees/getAll", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesGetList();
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const employeeGetItemThunk = createAsyncThunk("employees/getItem", async (params, thunkApi) => {
  try {
    const res = await apiEmployeeGetItem(params);
    if(res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const employeeCreateThunk = createAsyncThunk("employees/create", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesCreate(params);
    return res.status;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const employeeDeleteThunk = createAsyncThunk("employees/delete", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesDelete(params);
    if(res.status === 200) {
      thunkApi.dispatch(employeesGetListThunk())
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const employeeUpdateThunk = createAsyncThunk("employees/update", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesUpdate(params);
    console.log("res-apiEmployeesUpdate", res)
    // if(res.status === 200) {
    //   thunkApi.dispatch(employeesGetListThunk())
    // }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}) ;

export const EmployeesSlice = createSlice({
  name: 'employees',
  initialState: {
    isLoading: false,
    employees: [],
    employee: {},
    error: null,
    status: null
  },
  reducers: {},
  extraReducers: (builder) => {

    // get list
    builder.addCase(employeesGetListThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(employeesGetListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employees = action.payload;
    })

    .addCase(employeesGetListThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

    // get item
    .addCase(employeeGetItemThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(employeeGetItemThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employee = action.payload;
    })

    .addCase(employeeGetItemThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

    //  create
    .addCase(employeeCreateThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(employeeCreateThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload;
    })

    .addCase(employeeCreateThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

    //  delete
    .addCase(employeeDeleteThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(employeeDeleteThunk.fulfilled, (state) => {
      state.isLoading = false;
    })

    .addCase(employeeDeleteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

    //  update
    .addCase(employeeUpdateThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(employeeUpdateThunk.fulfilled, (state) => {
      state.isLoading = false;
    })

    .addCase(employeeUpdateThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error
    })

  }
});

export default EmployeesSlice.reducer;
