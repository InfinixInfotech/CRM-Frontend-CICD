import { createSlice } from "@reduxjs/toolkit";
import { getTargetByEmployeeCodeThunk } from "../Services/thunks/TargetByEmployeeCodeThunk";


const TargetByEmployeeCodeReducer = createSlice({
  name: "targetEmployeeCode",
  initialState: {
    data1: [],
    loading1: false,
    error1: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTargetByEmployeeCodeThunk .pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
      })
      .addCase(getTargetByEmployeeCodeThunk .fulfilled, (state, action) => {
        state.loading1 = false;
        state.data1 = action.payload;
      })
      .addCase(getTargetByEmployeeCodeThunk .rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      })

    }
});

export default TargetByEmployeeCodeReducer.reducer;