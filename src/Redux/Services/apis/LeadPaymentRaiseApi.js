import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteLeadPaymentRaiseUrl, emp, getAllLeadPaymentRaiseUrl, getAllPRUrl, getByIdLeadPaymentRaiseUrl, postLeadPaymentRaiseUrl, putLeadPaymentRaiseUrl, staticToken, storedUsername } from "../apiServer/ApiServer";


export const postLeadPaymentRaise = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postLeadPaymentRaiseUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllLeadPaymentRaise = async (params) => {
  try {
    // const employeeCode = localStorage.getItem("empCode");
    // const storedUsername = localStorage.getItem("userName");
    let url = '';  

    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
        console.log("Admin found in the string."+params);
        url = `${getAllPRUrl}?pageNumber=${params.pageNumber}&limit=${params.limit}`; 
    } else {
        console.log("Admin not found in the string.");
        url = `${getAllLeadPaymentRaiseUrl}?employeeCode=${emp}&pageNumber=${params.pageNumber}&limit=${params.limit}`; 
    }
  
    const response = await apiGetCallWithAuth(url, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};

export const deleteLeadPaymentRaise = async (id) => {
  try {
    const urlWithId = `${deleteLeadPaymentRaiseUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putLeadPaymentRaise = async (params) => {
  try {
    console.log("params--------------------->",params);
    
    const { id } = params;  // Extract the id from the params object
    const { prId } = params;  // Extract the id from the params object
    const urlWithId = `${putLeadPaymentRaiseUrl}`;  // Use the id from params to construct the URL
    const response = await apiPostCallWithAuth(urlWithId, params, staticToken);
    return response;
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};


export const getByIdLeadPaymentRaise = async (id) => {
  try {
    const urlWithId = `${getByIdLeadPaymentRaiseUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
