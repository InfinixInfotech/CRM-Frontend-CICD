import { createSlice } from "@reduxjs/toolkit";
// import { deleteSegmentPlanThunk, getAllSegmentPlanThunk, getByIdSegmentPlanThunk, postSegmentPlanThunk, putSegmentPlanThunk } from "../Services/thunks/SegmentPlanThunk";
import { postUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { fetchAllUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";

const uploadBulkLeadReducer = createSlice({
  name: "uploadbulklead",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUploadBulkLeadThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUploadBulkLeadThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postUploadBulkLeadThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getByIdUploadBulkLeadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdUploadBulkLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdUploadBulkLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchAllUploadBulkLeadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUploadBulkLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(fetchAllUploadBulkLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        
    //   .addCase(putSegmentPlanThunk.pending, (state) => {
    //     state.loading = true;
    //     state.putError = null;
    //   })
    //   .addCase(putSegmentPlanThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.putSuccess = true;        
    //     state.data = action.payload;
    //   })
    //   .addCase(putSegmentPlanThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.putError = action.payload;
    //   })

    //   .addCase(deleteSegmentPlanThunk.pending, (state) => {
    //     state.loading = true;
    //     state.deleteError = null;
    //   })
    //   .addCase(deleteSegmentPlanThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.deleteSuccess = true;        

    //   })
    //   .addCase(deleteSegmentPlanThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.deleteError = action.payload;
    //   })



    ;
  },
});

export default uploadBulkLeadReducer.reducer;
