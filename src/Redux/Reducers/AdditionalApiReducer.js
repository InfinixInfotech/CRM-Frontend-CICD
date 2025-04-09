import { createSlice } from "@reduxjs/toolkit";
import { getAllEmpCodeNameThunk, getAllleadInfoThunk, getExtensionEmpThunk, getUserByIdThunk, persnolDetailsThunk, postCallingEmpThunk, searchUserThunk, todayFollowUpDataThunk } from "../Services/thunks/AdditionalApiThunk";

const addtionalApiReducer = createSlice({
  name: "additional",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllEmpCodeNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmpCodeNameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.emplist = action.payload;
      })
      .addCase(getAllEmpCodeNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getExtensionEmpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExtensionEmpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getExtensionEmpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(postCallingEmpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCallingEmpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postCallingEmpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(persnolDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(persnolDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(persnolDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(searchUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(searchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(searchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(todayFollowUpDataThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(todayFollowUpDataThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(todayFollowUpDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(getAllleadInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllleadInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllleadInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
  },
});

export default addtionalApiReducer.reducer;
