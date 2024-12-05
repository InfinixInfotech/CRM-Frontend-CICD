import { createSlice } from "@reduxjs/toolkit";
import { postSegmentPlanThunk } from "../Services/thunks/SegmentPlanThunk";

const segmentPlanReducer = createSlice({
  name: "segmentplan",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSegmentPlanThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSegmentPlanThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postSegmentPlanThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default segmentPlanReducer.reducer;
