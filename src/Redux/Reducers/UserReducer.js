import { createSlice } from "@reduxjs/toolkit";
import { getAllUserThunk, getByIdUserThunk, postUserThunk , putUserThunk} from "../Services/thunks/UserThunk";


const userReducer = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postUserThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(putUserThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })


      // For getByIdLeadStatusThunk
      .addCase(getByIdUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getAllUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userReducer.reducer;
