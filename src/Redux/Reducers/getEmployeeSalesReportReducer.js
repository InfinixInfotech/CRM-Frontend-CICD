import { createSlice } from "@reduxjs/toolkit";
// import { deleteSalesOrderThunk, getAllSalesOrderThunk, getByIdSalesOrderThunk, postSalesOrderThunk, putSalesOrderThunk } from "../Services/thunks/SalesOrderThunk";
import { getAllSalesReportThunk } from "../Services/thunks/EmployeeSalesReportThunk";

const getEmployeeSalesReportReducer = createSlice({
  name: "salesReport",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalesReportThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalesReportThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllSalesReportThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // .addCase(getAllSmsByEmpCodeThunk .pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getAllSmsByEmpCodeThunk .fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.data = action.payload;
      // })
      // .addCase(getAllSmsByEmpCodeThunk .rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
    },
});

export default getEmployeeSalesReportReducer.reducer;