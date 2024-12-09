import { createSlice } from "@reduxjs/toolkit";
import { deleteGroupsThunk, getAllGroupsThunk, getByIdGroupsThunk, postGroupsThunk, putGroupsThunk } from "../Services/thunks/GroupsThunk";

const groupsReducer = createSlice({
  name: "groups",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postGroupsThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postGroupsThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postGroupsThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(putGroupsThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putGroupsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putGroupsThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })

      .addCase(deleteGroupsThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteGroupsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteGroupsThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })

      // For getByIdLeadStatusThunk
      .addCase(getByIdGroupsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdGroupsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdGroupsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllGroupsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGroupsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllGroupsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default groupsReducer.reducer;
