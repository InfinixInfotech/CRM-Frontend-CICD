import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteLeadPaymentRaiseUrl, getAllLeadPaymentRaiseUrl, getByIdLeadPaymentRaiseUrl, postLeadPaymentRaiseUrl, putLeadPaymentRaiseUrl, staticToken } from "../apiServer/ApiServer";


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

export const getAllLeadPaymentRaise = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllLeadPaymentRaiseUrl, staticToken);
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
    const urlWithId = `${putLeadPaymentRaiseUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
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
