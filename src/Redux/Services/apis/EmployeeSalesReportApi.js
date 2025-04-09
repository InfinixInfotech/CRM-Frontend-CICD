import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetAllEmployeeSalesReport, GetAllSMSByEmployeeCode, staticToken, storedEmailId } from "../apiServer/ApiServer";

export const getEmployeeSalesReport = async () => {
  try {
    const urlWithId = `${GetAllEmployeeSalesReport}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
export const getAllSMSByEmployeeCode = async () => {
  try {
    const urlWithId = `${GetAllSMSByEmployeeCode}?employeeCode=${storedEmailId}&pageNumber=${1}&limit=${5}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
