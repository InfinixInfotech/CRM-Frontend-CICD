import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postSegmentPlanUrl, staticToken } from "../apiServer/ApiServer";

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
