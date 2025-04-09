import { apiGetCallWithRersponseAuth } from "../../../Utils/apiUtils";
import { followUpDetailsFilterTillDateUrl, staticToken } from "../apiServer/ApiServer";

export const getFollowupDetailsFilterTillDateData = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${followUpDetailsFilterTillDateUrl}?${queryString}`;

    const response = await apiGetCallWithRersponseAuth(url, params, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting follow-up details:", error);
    return null;
  }
};
