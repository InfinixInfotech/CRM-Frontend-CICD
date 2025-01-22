import { apiDeleteCallWithAuth, apiGetCallWithRersponseAuth, apiPostCallWithAuth, apiPostCallWithAuthFormData } from "../../../Utils/apiUtils";
import { fetchAllUploadBulkLeadUrl, GetByIdUploadBulkLeadUrl, postUploadBulkLeadUrl, staticToken, UpdateByIdBulkLeadUrl } from "../apiServer/ApiServer";
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
  // console.log("params-------------------",params);
  try {
    const { EmployeeCode, CampaignName } = params;
    const urlWithId = `${GetByIdUploadBulkLeadUrl}?EmployeeCode=${EmployeeCode}&CampaignName=${CampaignName}`;
    const response = await apiGetCallWithRersponseAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
export const fetchAllUploadBulkLead = async (params) => {
  try {
    const { EmployeeCode, CampaignName } = params;
    const urlWithId = `${fetchAllUploadBulkLeadUrl}?EmployeeCode=${EmployeeCode}&CampaignName=${CampaignName}`;
    const response = await apiGetCallWithRersponseAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};
export const UpdateBulkLead = async (params) => {
  try {
    // const { leadId } = params; 
    // const { prId } = params;  
    // const urlWithId = `${UpdateByIdBulkLeadUrl}?id=${id}&prId=${prId}`;  
    const urlWithId = `${UpdateByIdBulkLeadUrl}`;  // 
    const response = await apiPostCallWithAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};