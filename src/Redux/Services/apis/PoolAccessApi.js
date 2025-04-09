import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { createPoolAccessUrl, DeletePoolAccessUrl, getAllPoolAccessUrl, staticToken, UpdatePoolAccessUrl } from "../apiServer/ApiServer";
// import { deleteSegmentPlanUrl, getAllSegmentPlanUrl, getByIdSegmentPlanUrl, postSegmentPlanUrl, putSegmentPlanUrl, staticToken } from "../apiServer/ApiServer";

export const createPoolAccess = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
        createPoolAccessUrl ,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllPoolAccess  = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllPoolAccessUrl, staticToken);

    return response; 
  } catch (error) {
    
    return null; 
  }
};

export const UpdatePoolAccess  = async (params) => {
  try {
    const urlWithId = `${UpdatePoolAccessUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

// DELETE Lead Status
export const DeletePoolAccess  = async (id) => {
  try {
    const urlWithId = `${DeletePoolAccessUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// // GET Lead Status by ID
// export const getByIdSegmentPlan  = async (id) => {
//   try {
//     const urlWithId = `${getByIdSegmentPlanUrl}?id=${id}`;
//     const response = await apiGetCallWithAuth(urlWithId, staticToken);
//     return response; 
//   } catch (error) {
//     console.error("Error getting lead status by ID:", error);
//     return null;
//   }
// };