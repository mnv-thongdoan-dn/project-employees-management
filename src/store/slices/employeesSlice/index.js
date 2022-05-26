import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  apiEmployeesGetList, 
  apiEmployeesCreate, 
  apiEmployeesDelete,
  apiEmployeesUpdate,
  apiEmployeeGetItem,
  apiEmployeesSearch
} from '../../../api/employees/employees.api';

export const employeesGetListThunk = createAsyncThunk("employees/getAll", async (thunkApi) => {
  try {
    const res = await apiEmployeesGetList();
      return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const employeeGetItemThunk = createAsyncThunk("employees/getItem", async (params, thunkApi) => {
  try {
    const res = await apiEmployeeGetItem(params);
      return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const employeeCreateThunk = createAsyncThunk("employees/create", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesCreate(params);
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const employeeDeleteThunk = createAsyncThunk("employees/delete", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesDelete(params);
    thunkApi.dispatch(employeesGetListThunk())
    return res;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}) ;

export const employeeUpdateThunk = createAsyncThunk("employees/update", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesUpdate(params);
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}) ;

export const employeeSearchThunk = createAsyncThunk("employees/search", async (params, thunkApi) => {
  try {
    const res = await apiEmployeesSearch(params);
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}) ;

export const EmployeesSlice = createSlice({
  name: 'employees',
  initialState: {
    isLoading: false,
    isLoadingSearch: false,
    employees: [],
    employee: {},
    error: null,
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

    .addCase(employeeCreateThunk.fulfilled, (state) => {
      state.isLoading = false;
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

    //  search
    .addCase(employeeSearchThunk.pending, (state) => {
      state.isLoadingSearch = true;
      state.isLoading = true;
    })

    .addCase(employeeSearchThunk.fulfilled, (state, action) => {
      state.isLoadingSearch = false;
      state.isLoading = false;
      console.log(action.payload)
      state.employees = action.payload;
    })

    .addCase(employeeSearchThunk.rejected, (state, action) => {
      state.isLoadingSearch = false;
      state.isLoading = false;
      state.error = action.error
    })

  }
});

export default EmployeesSlice.reducer;
