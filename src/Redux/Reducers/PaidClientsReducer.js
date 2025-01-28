import { createSlice } from "@reduxjs/toolkit";
import {  getAllPaidClientsThunk } from "../Services/thunks/PaidClientsThunk";

const PaidClientsReducer = createSlice({
  name: "paidclients",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
.addCase(getAllPaidClientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPaidClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllPaidClientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PaidClientsReducer.reducer;