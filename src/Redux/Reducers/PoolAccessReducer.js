import { createSlice } from "@reduxjs/toolkit";
import { createPoolAccessThunk, DeletePoolAccessThunk, getAllPoolAccessThunk, UpdatePoolAccessThunk } from "../Services/thunks/PoolAccessThunk";
// import { deleteSegmentPlanThunk, getAllSegmentPlanThunk, getByIdSegmentPlanThunk, postSegmentPlanThunk, putSegmentPlanThunk } from "../Services/thunks/SegmentPlanThunk";
const poolAccessReducer = createSlice({
  name: "poolAccess",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPoolAccessThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoolAccessThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPoolAccessThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
         
      .addCase(UpdatePoolAccessThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(UpdatePoolAccessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(UpdatePoolAccessThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(DeletePoolAccessThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(DeletePoolAccessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(DeletePoolAccessThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })

    //   // For getByIdLeadStatusThunk
    //   .addCase(getByIdSegmentPlanThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getByIdSegmentPlanThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(getByIdSegmentPlanThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // For getAllLeadStatusThunk
      .addCase(getAllPoolAccessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPoolAccessThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllPoolAccessThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default poolAccessReducer.reducer;
