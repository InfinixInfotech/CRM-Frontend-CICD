import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postSegmentListUrl, staticToken } from "../apiServer/ApiServer";

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
