import { createSlice } from "@reduxjs/toolkit";
import { deleteAddLeadThunk, getAllAddLeadThunk, getByIdAddLeadThunk, postAddLeadThunk, putAddLeadThunk } from "../Services/thunks/AddLeadThunk";

const addLeadReducer = createSlice({
  name: "addlead",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For postLeadStatusThunk
      .addCase(postAddLeadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postAddLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllAddLeadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllAddLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteAddLeadThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteAddLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteAddLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(putAddLeadThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putAddLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putAddLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(getByIdAddLeadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdAddLeadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdAddLeadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default addLeadReducer.reducer;
