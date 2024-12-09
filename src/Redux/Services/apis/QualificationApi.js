import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithoutAuth } from "../../../Utils/apiUtils";
import { deleteQualificationUrl, getAllQualificationUrl, getByIdQualificationUrl, postQualificationUrl, putQualificationUrl, staticToken } from "../apiServer/ApiServer";

export const postQualification = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postQualificationUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllQualification = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllQualificationUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteQualification = async (id) => {
  try {
    const urlWithId = `${deleteQualificationUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putQualification = async (params) => {
  try {
    const urlWithId = `${putQualificationUrl}?id=${id}`;
    const response = await apiPutCallWithoutAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdQualification = async (id) => {
  try {
    const urlWithId = `${getByIdQualificationUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
