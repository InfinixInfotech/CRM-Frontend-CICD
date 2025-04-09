import { createSlice } from "@reduxjs/toolkit";
import { getAllAgeFilterThunk, getAllPaidClientFilterThunk, getPaymentFilterThunk, getSoFilterThunk } from "../Services/thunks/AgeFilterThunk";

const ageFilterReducer = createSlice({
  name: "agefilter",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For getAllLeadStatusThunk
      .addCase(getAllAgeFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgeFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllAgeFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPaymentFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPaymentFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSoFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSoFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getAllPaidClientFilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPaidClientFilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPaidClientFilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default ageFilterReducer.reducer;
