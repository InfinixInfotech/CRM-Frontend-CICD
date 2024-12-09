import { createSlice } from "@reduxjs/toolkit";
import { deleteSegmentPlanThunk, getAllSegmentPlanThunk, getByIdSegmentPlanThunk, postSegmentPlanThunk, putSegmentPlanThunk } from "../Services/thunks/SegmentPlanThunk";

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
      })
         
      .addCase(putSegmentPlanThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putSegmentPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putSegmentPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(deleteSegmentPlanThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteSegmentPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteSegmentPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })

      // For getByIdLeadStatusThunk
      .addCase(getByIdSegmentPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdSegmentPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdSegmentPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllSegmentPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSegmentPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllSegmentPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default segmentPlanReducer.reducer;
