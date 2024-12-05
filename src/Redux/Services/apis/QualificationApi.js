import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postQualificationUrl, staticToken } from "../apiServer/ApiServer";

export const postQualification = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postQualificationUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
