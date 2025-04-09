import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteSalesOrderUrl, emp, getAllSalesOrderUrl, getAllSOUrl, getByIdSalesOrderUrl, postSalesOrderUrl, putSalesOrderUrl, staticToken, storedUsername } from "../apiServer/ApiServer";


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

export const getAllSalesOrder = async (params) => {
  try {
  //  const employeeCode = localStorage.getItem("empCode");
// const storedUsername = localStorage.getItem("userName");
// console.log(storedUsername)
    let url = '';
    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      console.log("Admin found in the string.");
      url = `${getAllSOUrl}?pageNumber=${params.pageNumber}&limit=${params.itemsPerPage}`;
      console.log(url)

    }
     else {
      console.log("Admin not found in the string.");
      url = `${getAllSalesOrderUrl}?employeeCode=${emp}&pageNumber=${params.pageNumber}&limit=${params.itemsPerPage}`;
      console.log(url)
    }

    const response =await apiGetCallWithAuth(url,staticToken);
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
    console.log("So params---------------",params);
    
    // const Id = params.id;
    // const SoId = params.soId;
    // const urlWithId = `${putSalesOrderUrl}?id=${Id}&soId=${SoId}`;
    const urlWithId = `${putSalesOrderUrl}`;
    const response = await apiPostCallWithAuth(urlWithId, params, staticToken);
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
