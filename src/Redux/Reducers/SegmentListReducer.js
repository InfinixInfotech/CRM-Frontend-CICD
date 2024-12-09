import { createSlice } from "@reduxjs/toolkit";
import { deleteSegmentListThunk, getAllSegmentListThunk, getByIdSegmentListThunk, postSegmentListThunk, putSegmentListThunk } from "../Services/thunks/SegmentListThunk";
import { getByIdSegmentList } from "../Services/apis/SegmentListApi";

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

      
      .addCase(putSegmentListThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putSegmentListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putSegmentListThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(deleteSegmentListThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteSegmentListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteSegmentListThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })

      // For getByIdLeadStatusThunk
      .addCase(getByIdSegmentListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdSegmentListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdSegmentListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllSegmentListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSegmentListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllSegmentListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default segmentListReducer.reducer;
