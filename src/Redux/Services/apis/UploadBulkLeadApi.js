import { apiDeleteCallWithAuth, apiGetCallWithRersponseAuth, apiPostCallWithAuth, apiPostCallWithAuthFormData } from "../../../Utils/apiUtils";
import { GetcampaignNameByEmpCodeUrl, fetchAllUploadBulkLeadUrl, GetByIdUploadBulkLeadUrl, postUploadBulkLeadUrl, staticToken, UpdateByIdBulkLeadUrl, GetByBulkLeadUrl, storedUsername, followUpDetailsUrl, emp, DisposeDataUrl, followUpDetailsFilterTillDateUrl } from "../apiServer/ApiServer";
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
  try {
    // const storedUsername = localStorage.getItem("userName");
    let url = '';

    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      url = `${GetByBulkLeadUrl}?pageNumber=${params.pageNumber}&limit=${params.limit}`;
    } else {
      const { employeeCode, LeadSourceName, pageNumber, limit } = params;
      url = `${GetByIdUploadBulkLeadUrl}?EmployeeCode=${employeeCode||emp}&LeadSourceName=${LeadSourceName}&pageNumber=${pageNumber}&limit=${limit}`;
    }

    const response = await apiGetCallWithRersponseAuth(url, params, staticToken);
    console.log(response)
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};


export const getFollowupDetailsById = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${followUpDetailsUrl}?${queryString}`;

    const response = await apiGetCallWithRersponseAuth(url, params, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting follow-up details:", error);
    return null;
  }
};

// export const getFollowupDetailsFilterTillDate = async (params) => {
//   try {
//     const queryString = new URLSearchParams(params).toString();
//     const url = `${followUpDetailsFilterTillDateUrl}?${queryString}`;

//     const response = await apiGetCallWithRersponseAuth(url, params, staticToken);
//     return response;
//   } catch (error) {
//     console.error("Error getting follow-up details:", error);
//     return null;
//   }
// };


export const fetchAllUploadBulkLead = async (params) => {
  try {
    const { EmployeeCode, LeadSourceName } = params;
    const urlWithId = `${fetchAllUploadBulkLeadUrl}?EmployeeCode=${EmployeeCode}&LeadSourceName=${LeadSourceName}`;
    const response = await apiGetCallWithRersponseAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};

export const disposeData= async (params) => {
  try {
    const { EmployeeCode, LeadSourceName,LeadId } = params;
    const urlWithId = `${DisposeDataUrl}?EmployeeCode=${EmployeeCode}&LeadSourceName=${LeadSourceName}&${LeadId}`;
    const response = await apiPostCallWithAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};


export const fetchCampaignName = async () => {
  try {
    const response = await apiGetCallWithRersponseAuth(GetcampaignNameByEmpCodeUrl, staticToken);
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