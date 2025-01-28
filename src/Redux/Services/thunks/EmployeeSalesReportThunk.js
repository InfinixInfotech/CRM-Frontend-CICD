import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeSalesReport } from "../apis/EmployeeSalesReportApi";


export const getAllSalesReportThunk = createAsyncThunk(
    'salesReport/getEmployeeSalesReport',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getEmployeeSalesReport();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
