import { createSlice } from "@reduxjs/toolkit";
// import { getAllAgeFilterThunk } from "../Services/thunks/AgeFilterThunk";
import { getsearchStatefilterThunk } from "../Services/thunks/StateFilterThunks";

const searchStateFilterReducer = createSlice({
  name: "searchstatefilter",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For getAllLeadStatusThunk
      .addCase(getsearchStatefilterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getsearchStatefilterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getsearchStatefilterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default searchStateFilterReducer.reducer;
