import {  apiGetCallWithAuth } from "../../../Utils/apiUtils";
import {  emp, GetTotalGrandTotalUrl, staticToken } from "../apiServer/ApiServer";


export const getGrandTotal = async () => {
  try {
    const urlWithId = `${GetTotalGrandTotalUrl}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};

