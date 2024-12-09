import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import { deleteSegmentPlanUrl, getAllSegmentPlanUrl, getByIdSegmentPlanUrl, postSegmentPlanUrl, putSegmentPlanUrl, staticToken } from "../apiServer/ApiServer";

export const postSegmentPlan = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postSegmentPlanUrl ,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllSegmentPlan  = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllSegmentPlanUrl, staticToken);

    return response; 
  } catch (error) {
    
    return null; 
  }
};

export const putSegmentPlan  = async (params) => {
  try {
    const urlWithId = `${putSegmentPlanUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

// DELETE Lead Status
export const deleteSegmentPlan  = async (id) => {
  try {
    const urlWithId = `${deleteSegmentPlanUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// GET Lead Status by ID
export const getByIdSegmentPlan  = async (id) => {
  try {
    const urlWithId = `${getByIdSegmentPlanUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};