import { createSlice } from "@reduxjs/toolkit";
import { postDepartmentThunk,deleteDepartmentThunk , putDepartmentThunk, getByIdDepartmentThunk,getAllDepartmentThunk } from "../Services/thunks/DepartmentThunk";

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
      // For postLeadStatusThunk
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
      })

      // For getAllLeadStatusThunk
      .addCase(getAllDepartmentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDepartmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllDepartmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteDepartmentThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteDepartmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteDepartmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(putDepartmentThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putDepartmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putDepartmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(getByIdDepartmentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdDepartmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdDepartmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default departmentReducer.reducer;
