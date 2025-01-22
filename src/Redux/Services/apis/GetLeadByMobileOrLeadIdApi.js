import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetLeadByMobileOrLeadIdUrl, staticToken } from "../apiServer/ApiServer";

export const GetLeadByMobileOrLeadIdApi  = async (params) => {
  try {
    const isNumber = /^\d+$/.test(params.data);
    console.log("params---------------",params);
    
    const urlWithId = `${GetLeadByMobileOrLeadIdUrl}?${isNumber ? `mobileNumber=${params.data}` : `leadId=${params.data}`}&employeeCode=${params.employeeCode}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
