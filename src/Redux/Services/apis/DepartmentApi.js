import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import {
  deleteDepartmentUrl,
  putDepartmentUrl,
  postDepartmentUrl,
  getAllDepartmentUrl,
  getByIdDepartmentUrl,
  staticToken
} from "../apiServer/ApiServer";

export const postDepartment = async (params) => {
  try {
    console.log(params)
    const response = await apiPostCallWithAuth(
      postDepartmentUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllDepartment = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllDepartmentUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteDepartment = async (id) => {
  try {
    const urlWithId = `${deleteDepartmentUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putDepartment = async (params) => {
  try {
    const urlWithId = `${putDepartmentUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdDepartment = async (id) => {
  try {
    const urlWithId = `${getByIdDepartmentUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
