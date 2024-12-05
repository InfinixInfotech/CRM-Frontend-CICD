import { createSlice } from "@reduxjs/toolkit";
import { postSegmentListThunk } from "../Services/thunks/SegmentListThunk";

const segmentListReducer = createSlice({
  name: "segmentlist",
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
      .addCase(postSegmentListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSegmentListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.postSuccess = true;        
        state.data = action.payload;
      })
      .addCase(postSegmentListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default segmentListReducer.reducer;
