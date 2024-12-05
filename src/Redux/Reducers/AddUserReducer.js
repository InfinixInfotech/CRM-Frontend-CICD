import { createSlice } from "@reduxjs/toolkit";
import { postAddUserThunk } from "../Services/thunks/AddUserThunk";

const addUserReducer = createSlice({
  name: "adduser",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAddUserThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAddUserThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postAddUserThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addUserReducer.reducer;
