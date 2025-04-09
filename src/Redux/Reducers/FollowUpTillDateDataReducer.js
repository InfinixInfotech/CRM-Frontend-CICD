import { createSlice } from "@reduxjs/toolkit";
// import { getFollowUpDetailsFilterTillDateThunk } from "../Services/thunks/FollowUpTillDateThunk";
import { getFollowUpDetailsFilterTillDateDataThunk } from "../Services/thunks/FollowUpTillDateDataThunk";

const FollowUpTillDateDataReducer = createSlice({
    name: "followuptilldatedata",
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFollowUpDetailsFilterTillDateDataThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getFollowUpDetailsFilterTillDateDataThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; 
        })
        .addCase(getFollowUpDetailsFilterTillDateDataThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });
  
  export default FollowUpTillDateDataReducer.reducer;