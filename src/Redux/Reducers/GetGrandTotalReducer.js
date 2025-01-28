import { createSlice } from "@reduxjs/toolkit";
import { getAllTotalGrandTotalThunk } from "../Services/thunks/TotalGrandTotalThunk";

const grandTotalReducer = createSlice({
  name: "grandTotal",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTotalGrandTotalThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTotalGrandTotalThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllTotalGrandTotalThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
});
export default grandTotalReducer.reducer;