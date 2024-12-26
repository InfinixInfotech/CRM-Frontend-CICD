import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteSalesOrderUrl, getAllSalesOrderUrl, getByIdSalesOrderUrl, postSalesOrderUrl, putSalesOrderUrl, staticToken } from "../apiServer/ApiServer";


export const postSalesOrder = async (params) => {
  try {
    console.log("SalesOrderAPiParams:-------------------   "+JSON.stringify(params))
    const response = await apiPostCallWithAuth(
      postSalesOrderUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllSalesOrder = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllSalesOrderUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteSalesOrder = async (id) => {
  try {
    const urlWithId = `${deleteSalesOrderUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putSalesOrder = async (params) => {
  try {
    const urlWithId = `${putSalesOrderUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdSalesOrder = async (id) => {
  try {
    const urlWithId = `${getByIdSalesOrderUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
