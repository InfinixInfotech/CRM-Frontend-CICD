import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { CreateDesignationUrl, deleteDesignationUrl, fetchByIdDesignationUrl, GetAllDesignationUrl, staticToken, UpdateDesignationUrl } from "../apiServer/ApiServer";


export const CreateDesignation = async (params) => {
  try {
    console.log(params)
    const response = await apiPostCallWithAuth(
      CreateDesignationUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GetAllDesignation = async () => {
  try {
    const response = await apiGetCallWithAuth(GetAllDesignationUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteDesignation = async (id) => {
  try {
    const urlWithId = `${deleteDesignationUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const UpdateDesignation = async (params) => {
  try {
    const urlWithId = `${UpdateDesignationUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const fetchByIdDesignation = async (id) => {
  try {
    const urlWithId = `${fetchByIdDesignationUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
