import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import {
  deleteLeadSourceUrl,
  getAllLeadSourceUrl,
  getByIdLeadSourceUrl,
  postLeadSourceUrl,
  putLeadSourceUrl,
  staticToken,
} from "../apiServer/ApiServer";

export const postLeadSource = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postLeadSourceUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllLeadSource = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllLeadSourceUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteLeadSource = async (id) => {
  try {
    const urlWithId = `${deleteLeadSourceUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putLeadSource = async (params) => {
  try {
    const urlWithId = `${putLeadSourceUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdLeadSource = async (id) => {
  try {
    const urlWithId = `${getByIdLeadSourceUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
