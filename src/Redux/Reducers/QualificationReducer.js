import { createSlice } from "@reduxjs/toolkit";
import { postQualificationThunk } from "../Services/thunks/QualificationThunk";

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
      });
  },
});

export default qualificationReducer.reducer;
