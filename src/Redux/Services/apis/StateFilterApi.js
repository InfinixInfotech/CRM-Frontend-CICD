import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { StateFilterUrl, staticToken } from "../apiServer/ApiServer";


export const searchStatefilter = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const urlWithParams = `${StateFilterUrl}?${queryString}`;

    const response = await apiGetCallWithAuth(urlWithParams, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
