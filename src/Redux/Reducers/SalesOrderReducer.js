import { createSlice } from "@reduxjs/toolkit";
import { deleteSalesOrderThunk, getAllSalesOrderThunk, getByIdSalesOrderThunk, postSalesOrderThunk, putSalesOrderThunk } from "../Services/thunks/SalesOrderThunk";

const salesOrderReducer = createSlice({
  name: "salesorder",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSalesOrderThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSalesOrderThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postSalesOrderThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(getAllSalesOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalesOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllSalesOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllLeadStatusThunk
      .addCase(deleteSalesOrderThunk.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(deleteSalesOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;        
        // state.data =state.data.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteSalesOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload;
      })
      
     
      .addCase(putSalesOrderThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(putSalesOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(putSalesOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
      .addCase(getByIdSalesOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdSalesOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByIdSalesOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesOrderReducer.reducer;
