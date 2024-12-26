import { apiDeleteCallWithAuth, apiGetCallWithRersponseAuth, apiPostCallWithAuth, apiPostCallWithAuthFormData, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { fetchAllUploadBulkLeadUrl, GetByIdUploadBulkLeadUrl, postUploadBulkLeadUrl, staticToken } from "../apiServer/ApiServer";


export const postUploadBulkLead = async (params) => {  
  try {
    const response = await apiPostCallWithAuthFormData(
      postUploadBulkLeadUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getByIdUploadBulkLead = async (params) => {
  console.log(params);
  try {
    const urlWithId = `${GetByIdUploadBulkLeadUrl}?EmployeeCode=INFSASHANT1007&CampaignName=INFDEC232024`;
    console.log(urlWithId);
    
    const response = await apiGetCallWithRersponseAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};

export const fetchAllUploadBulkLead = async (params) => {
  try {
    const urlWithId = `${fetchAllUploadBulkLeadUrl}?EmployeeCode=INFSASHANT1007&CampaignName=INFDEC232024`;
    const response = await apiGetCallWithRersponseAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};


// export const deleteSalesOrder = async (id) => {
//   try {
//     const urlWithId = `${deleteSalesOrderUrl}?id=${id}`;
//     const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
//     return response; 
//   } catch (error) {
//     console.error("Error deleting lead status:", error);
//     return { success: false, message: error.message || 'An error occurred' };
//   }
// };

// export const putSalesOrder = async (params) => {
//   try {
//     const urlWithId = `${putSalesOrderUrl}?id=${id}`;
//     const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
//     return response; 
//   } catch (error) {
//     console.error("Error updating lead status:", error);
//     return null;
//   }
// };

