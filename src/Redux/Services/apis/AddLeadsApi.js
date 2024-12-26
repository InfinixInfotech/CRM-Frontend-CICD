import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteAddLeadUrl, getAllAddLeadUrl, getByIdAddLeadUrl, postAddLeadUrl, putAddLeadUrl, staticToken } from "../apiServer/ApiServer";
// import {
//   deleteDepartmentUrl,
//   putDepartmentUrl,
//   postDepartmentUrl,
//   getAllDepartmentUrl,
//   getByIdDepartmentUrl,
//   staticToken
// } from "../apiServer/ApiServer";

export const postAddLead = async (params) => {
  try {
    console.log(params)
    const response = await apiPostCallWithAuth(
      postAddLeadUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllAddLead = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllAddLeadUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteAddLead = async (id) => {
  try {
    const urlWithId = `${deleteAddLeadUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putAddLead = async (params) => {
  try {
    const urlWithId = `${putAddLeadUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdAddLead = async (id) => {
  try {
    const urlWithId = `${getByIdAddLeadUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
