import { apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { getAllUserUrl,  postUserUrl,  putUserUrl, staticToken } from "../apiServer/ApiServer";


export const postUser = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postUserUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllUser = async (params) => {     
  try {
    const url =`${getAllUserUrl}?pageNumber=${params.pageNumber}&limit=${params.itemsPerPage}`;
    const response = await apiGetCallWithAuth(url, staticToken);
    return response; 
  } catch (error) {
    
    return null; 
  }
};


export const putUser = async (params) => {
  try {
    const { id } = params; 
    const { employeeCode } = params;     
    const urlWithId = `${putUserUrl}?id=${id}&employeeCode=${employeeCode}`;
    const response = await apiPostCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};


// GET Lead Status by ID
export const getByIdUser = async (id) => {
  try {
    const urlWithId = `${getByIdUser}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};