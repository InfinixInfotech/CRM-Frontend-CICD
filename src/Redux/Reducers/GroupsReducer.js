import { createSlice } from "@reduxjs/toolkit";
import { postGroupsThunk } from "../Services/thunks/GroupsThunk";

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
      });
  },
});

export default groupsReducer.reducer;
