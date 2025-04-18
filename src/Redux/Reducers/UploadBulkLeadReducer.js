import { createSlice } from "@reduxjs/toolkit";
import { postUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { getByIdUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { fetchAllUploadBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { UpdateBulkLeadThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { getCampaignNameThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { getFollowUpDetailsThunk } from "../Services/thunks/UploadBulkLeadThunk";
import { disposeDataThunk } from "../Services/thunks/UploadBulkLeadThunk";
// import { getFollowUpDetailsFilterTillDateThunk } from "../Services/thunks/UploadBulkLeadThunk";

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
        
      .addCase(UpdateBulkLeadThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(UpdateBulkLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(UpdateBulkLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(getCampaignNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignNameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getCampaignNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(getFollowUpDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowUpDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getFollowUpDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })




      // .addCase(getFollowUpDetailsFilterTillDateThunk.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getFollowUpDetailsFilterTillDateThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload; 
      // })
      // .addCase(getFollowUpDetailsFilterTillDateThunk.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })


      
      .addCase(disposeDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disposeDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(disposeDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


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