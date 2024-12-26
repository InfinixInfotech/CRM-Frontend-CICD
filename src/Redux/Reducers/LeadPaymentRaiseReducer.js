import { createSlice } from "@reduxjs/toolkit";
import { deleteLeadPaymentRaiseThunk, getAllLeadPaymentRaiseThunk, getByIdLeadPaymentRaiseThunk, postLeadPaymentRaiseThunk, putLeadPaymentRaiseThunk } from "../Services/thunks/LeadPaymentRaiseThunk";

const leadPaymentRaiseReducer = createSlice({
  name: "leadpaymentraise",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(postLeadPaymentRaiseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLeadPaymentRaiseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postLeadPaymentRaiseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(getAllLeadPaymentRaiseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLeadPaymentRaiseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllLeadPaymentRaiseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(deleteLeadPaymentRaiseThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteLeadPaymentRaiseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteLeadPaymentRaiseThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(putLeadPaymentRaiseThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putLeadPaymentRaiseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putLeadPaymentRaiseThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(getByIdLeadPaymentRaiseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdLeadPaymentRaiseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdLeadPaymentRaiseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default leadPaymentRaiseReducer.reducer;
