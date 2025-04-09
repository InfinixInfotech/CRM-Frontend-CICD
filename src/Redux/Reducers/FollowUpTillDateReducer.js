import { createSlice } from "@reduxjs/toolkit";
import { getFollowUpDetailsFilterTillDateThunk } from "../Services/thunks/FollowUpTillDateThunk";

const FollowUpTillDateReducer = createSlice({
    name: "followuptilldate",
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFollowUpDetailsFilterTillDateThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getFollowUpDetailsFilterTillDateThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
        })
        .addCase(getFollowUpDetailsFilterTillDateThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  
  export default FollowUpTillDateReducer.reducer;