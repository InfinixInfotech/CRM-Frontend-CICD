import { createSlice } from "@reduxjs/toolkit";
import { postLeadStatusThunk, getAllLeadStatusThunk, putLeadStatusThunk, deleteLeadStatusThunk, getByIdLeadStatusThunk } from "../Services/thunks/LeadStatusThunk";

const leadStatusReducer = createSlice({
  name: "leadstatus",
  initialState: {
    data: [], 
    loading: false, 
    error: null,
    postSuccess: false, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For postLeadStatusThunk
      .addCase(postLeadStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.postSuccess = true;        
        state.data = action.payload;
      })
      .addCase(postLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       
      
      .addCase(putLeadStatusThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(deleteLeadStatusThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        state.data = action.payload;
      })
      .addCase(deleteLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })

      // For getByIdLeadStatusThunk
      .addCase(getByIdLeadStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllLeadStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadStatusReducer.reducer;
