import { createSlice } from "@reduxjs/toolkit";
import { CreateDesignationThunk, deleteDesignationThunk, fetchByIdDesignationThunk, GetAllDesignationThunk, UpdateDesignationThunk } from "../Services/thunks/DesignationThunk";


const designationReducer = createSlice({
  name: "designation",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For postLeadStatusThunk
      .addCase(CreateDesignationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateDesignationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(CreateDesignationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(GetAllDesignationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllDesignationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetAllDesignationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteDesignationThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteDesignationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteDesignationThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(UpdateDesignationThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(UpdateDesignationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(UpdateDesignationThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(fetchByIdDesignationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByIdDesignationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchByIdDesignationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default designationReducer.reducer;
