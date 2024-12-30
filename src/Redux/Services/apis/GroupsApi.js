import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteGroupsUrl, getAllGroupsUrl, getByIdGroupsUrl, postGroupsUrl, putGroupsUrl, staticToken } from "../apiServer/ApiServer";


export const postGroups = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postGroupsUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllGroups = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllGroupsUrl, staticToken);

    return response; 
  } catch (error) {
    
    return null; 
  }
};


export const putGroups = async (params) => {
  try {
    const {id} = params;
    const urlWithId = `${putGroupsUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

// DELETE Lead Status
export const deleteGroups = async (id) => {
  try {
    const urlWithId = `${deleteGroupsUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// GET Lead Status by ID
export const getByIdGroups = async (id) => {
  try {
    const urlWithId = `${getByIdGroupsUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};