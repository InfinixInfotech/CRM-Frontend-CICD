import { createSlice } from "@reduxjs/toolkit";
// import { getAllTodayTotalThunk } from "../Services/thunks/TodayTotalThunks";
import { getAllYesterdayTotalThunk } from "../Services/thunks/YesterdayTotalThunk";

const yesterdayTotalReducer = createSlice({
  name: "yesterdayTotal",
  initialState: {
    Yesterdaydata: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllYesterdayTotalThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllYesterdayTotalThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.Yesterdaydata = action.payload;
      })
      .addCase(getAllYesterdayTotalThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
});
export default yesterdayTotalReducer.reducer;