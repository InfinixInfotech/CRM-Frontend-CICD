import { apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { postAddUserUrl, staticToken } from "../apiServer/ApiServer";


export const postAddUser = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postAddUserUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
