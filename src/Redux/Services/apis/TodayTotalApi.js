import {  apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetTodayTotalEmpUrl, GetTodayTotalUrl,  staticToken, storedUsername } from "../apiServer/ApiServer";


// export const getTodayTotal = async () => {
//   try {
//     const urlWithId = `${GetTodayTotalUrl}`;
//     const response = await apiGetCallWithAuth(urlWithId, staticToken);
//     return response; 
//   } catch (error) {
//     console.error("Error getting lead status by ID:", error);
//     return null;
//   }
// };



export const getTodayTotal = async () => {
  try {
    // const storedUsername = localStorage.getItem("userName");
    let url = '';
    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      url = `${GetTodayTotalUrl}`;
    } else {
      // const { employeeCode, LeadSourceName, pageNumber, limit } = params;
      url = `${GetTodayTotalEmpUrl}?empCode=${emp}`;
    }

    const response = await apiGetCallWithAuth(url,staticToken);
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};