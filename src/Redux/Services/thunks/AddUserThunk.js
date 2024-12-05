import { createAsyncThunk } from "@reduxjs/toolkit";
// import { postLeadSource } from "../apis/LeadSourceApi";
import { postAddUser } from "../apis/AddUserApi";


export const postAddUserThunk = createAsyncThunk(
    'adduser/postAddUser',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postAddUser(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
   
