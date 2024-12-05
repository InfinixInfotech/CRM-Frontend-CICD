import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postGroupsUrl, staticToken } from "../apiServer/ApiServer";


export const postGroups = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postGroupsUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
