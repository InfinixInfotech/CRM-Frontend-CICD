import { createSlice } from "@reduxjs/toolkit";
import { getAllTodayTotalThunk } from "../Services/thunks/TodayTotalThunks";

const todayTotalReducer = createSlice({
  name: "todayTotal",
  initialState: {
    todayData: [],
    todayloading: false,
    todayerror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodayTotalThunk .pending, (state) => {
        state.todayloading = true;
        state.todayerror = null;
      })
      .addCase(getAllTodayTotalThunk .fulfilled, (state, action) => {
        state.todayloading = false;
        state.todayData = action.payload;
      })
      .addCase(getAllTodayTotalThunk .rejected, (state, action) => {
        state.todayloading = false;
        state.todayerror = action.payload;
      })
    },
});
export default todayTotalReducer.reducer;