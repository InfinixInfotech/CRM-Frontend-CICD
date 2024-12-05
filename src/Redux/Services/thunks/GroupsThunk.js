import { createAsyncThunk } from "@reduxjs/toolkit";
import { postGroups } from "../apis/GroupsApi";

export const postGroupsThunk = createAsyncThunk(
    'groups/postGroups',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postGroups(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);
   
