import { createSlice } from "@reduxjs/toolkit";
import { postDepartmentThunk } from "../Services/thunks/DepartmentThunk";

const departmentReducer = createSlice({
  name: "department",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDepartmentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDepartmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postDepartmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentReducer.reducer;
