import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSMSByEmployeeCode, getEmployeeSalesReport } from "../apis/EmployeeSalesReportApi";


export const getAllSmsByEmpCodeThunk = createAsyncThunk(
    'allSmsByEmpCode/getAllSmsByEmpCode',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllSMSByEmployeeCode();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
