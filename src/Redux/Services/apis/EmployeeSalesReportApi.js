import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { GetAllEmployeeSalesReport, staticToken } from "../apiServer/ApiServer";

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
