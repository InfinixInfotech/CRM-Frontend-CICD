import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetLeadByMobileOrLeadIdAdminUrl, GetLeadByMobileOrLeadIdUrl, staticToken, storedUsername } from "../apiServer/ApiServer";

// export const GetLeadByMobileOrLeadIdApi  = async (params) => {
//   try {
//     const isNumber = /^\d+$/.test(params.data);
//     // console.log("params---------------",params);
//     const urlWithId = `${GetLeadByMobileOrLeadIdUrl}?${isNumber ? `mobileNumber=${params.data}` : `leadId=${params.data}`}&ClientName=${params.data}&employeeCode=${params.employeeCode}`;
//     const response = await apiGetCallWithAuth(urlWithId, staticToken);
//     return response; 
//   } catch (error) {
//     console.error("Error getting lead status by ID:", error);
//     return null;
//   }
// };



export const GetLeadByMobileOrLeadIdApi = async (params) => {
  try {
    let url = "";
    const isNumber = /^\d+$/.test(params.data);

    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      url = `${GetLeadByMobileOrLeadIdAdminUrl}?${isNumber ? `mobileNumber=${params.data}` : `leadId=${params.data}`}`;
    } else {
      url =`${GetLeadByMobileOrLeadIdUrl}?${isNumber ? `mobileNumber=${params.data}` : `leadId=${params.data}`}&ClientName=${params.data}&employeeCode=${params.employeeCode}`;
    }

    const response = await apiGetCallWithAuth(url, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};