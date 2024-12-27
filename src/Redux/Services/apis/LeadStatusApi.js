import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteLeadStatusUrl, getAllLeadStatusUrl, getByIdLeadStatusUrl, postLeadStatusUrl, putLeadStatusUrl, staticToken } from "../apiServer/ApiServer";


export const postLeadStatus = async (params) => {
  try {
    
    const response = await apiPostCallWithAuth(postLeadStatusUrl, params, staticToken);
   
    return response; 
  } catch (error) {
    console.error(error); 
    return null; 
  }
};

export const getAllLeadStatus = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllLeadStatusUrl, staticToken);

    return response; 
  } catch (error) {
    
    return null; 
  }
};


export const putLeadStatus = async (params) => {
  try {
    const urlWithId = `${putLeadStatusUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

// DELETE Lead Status
export const deleteLeadStatus = async (id) => {
  try {
    const urlWithId = `${deleteLeadStatusUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// GET Lead Status by ID
export const getByIdLeadStatus = async (id) => {
  try {
    const urlWithId = `${getByIdLeadStatusUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};