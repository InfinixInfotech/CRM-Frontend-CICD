import { createSlice } from "@reduxjs/toolkit";
import { getAllSmsByEmpCodeThunk } from "../Services/thunks/MailSmsThunk";



const getAllSmsByEmpCodeReducer = createSlice({
  name: "allSmsByEmpCode",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllSmsByEmpCodeThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSmsByEmpCodeThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllSmsByEmpCodeThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
});

export default getAllSmsByEmpCodeReducer.reducer;