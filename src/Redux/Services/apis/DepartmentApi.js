import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postDepartmentUrl, staticToken } from "../apiServer/ApiServer";



export const postDepartment = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postDepartmentUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
