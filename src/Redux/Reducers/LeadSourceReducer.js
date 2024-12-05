import { createSlice } from "@reduxjs/toolkit";
import {
  deleteLeadSourceThunk,
  getAllLeadSourceThunk,
  getByIdLeadSourceThunk,
  postLeadSourceThunk,
  putLeadSourceThunk,
} from "../Services/thunks/LeadSourceThunk";

const leadSourceReducer = createSlice({
  name: "leadsource",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For postLeadStatusThunk
      .addCase(postLeadSourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLeadSourceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postLeadSourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllLeadSourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeadSourceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllLeadSourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteLeadSourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeadSourceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteLeadSourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
     
      .addCase(putLeadSourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(putLeadSourceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(putLeadSourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getByIdLeadSourceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdLeadSourceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdLeadSourceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leadSourceReducer.reducer;
