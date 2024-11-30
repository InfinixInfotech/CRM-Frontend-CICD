import { createSlice } from "@reduxjs/toolkit";
import { postLeadStatusThunk, getAllLeadStatusThunk } from "../Services/thunks/LeadStatusThunk";

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
        state.postSuccess = false; 
      })
      .addCase(postLeadStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.postSuccess = true; 
        state.data = action.payload;
      })
      .addCase(postLeadStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.postSuccess = false;
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
