import {  apiGetCallWithAuth } from "../../../Utils/apiUtils";
import {emp, GetByempTotalGrandTotalUrl, GetTargetByEmployeeCode, GetTotalGrandTotalBdeUrl, GetTotalGrandTotalUrl, staticToken, storedGroupName, storedUsername } from "../apiServer/ApiServer";


export const TargetByEmployeeCodeApi = async () => {
  try {
    // const storedUsername = localStorage.getItem("userName");
let url="";

 if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      url = `${GetTotalGrandTotalUrl}`;
    } else if (["BDE", "SBDE"].includes(storedGroupName)) {
      url = `${GetTotalGrandTotalBdeUrl}?EmpCode=${emp}`;
    } else if (["TL", "Manager", "Senior Manager", "DSH"].includes(storedGroupName)) {
      url = `${GetByempTotalGrandTotalUrl}?empCode=${emp}`;
    }

else{
     url = `${GetTargetByEmployeeCode}?employeeCode=${emp}`;
  }
    const response = await apiGetCallWithAuth(url, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};

