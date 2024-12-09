import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteSegmentListUrl, getAllSegmentListUrl, getByIdSegmentListUrl, postSegmentListUrl, putSegmentListUrl, staticToken } from "../apiServer/ApiServer";

export const postSegmentList = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postSegmentListUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getAllSegmentList  = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllSegmentListUrl, staticToken);

    return response; 
  } catch (error) {
    
    return null; 
  }
};


export const putSegmentList  = async (params) => {
  try {
    const urlWithId = `${putSegmentListUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

// DELETE Lead Status
export const deleteSegmentList  = async (id) => {
  try {
    const urlWithId = `${deleteSegmentListUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// GET Lead Status by ID
export const getByIdSegmentList  = async (id) => {
  try {
    const urlWithId = `${getByIdSegmentListUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};