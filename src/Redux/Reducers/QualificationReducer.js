import { createSlice } from "@reduxjs/toolkit";
import { deleteQualificationThunk, getAllQualificationThunk, getByIdQualificationThunk, postQualificationThunk, putQualificationThunk } from "../Services/thunks/QualificationThunk";
import { putQualification } from "../Services/apis/QualificationApi";

const qualificationReducer = createSlice({
  name: "qualification",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postQualificationThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postQualificationThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postQualificationThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllQualificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQualificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllQualificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteQualificationThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteQualificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteQualificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(putQualificationThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putQualificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putQualificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(getByIdQualificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdQualificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdQualificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default qualificationReducer.reducer;
