import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import {
  deleteLeadSourceUrl,
  getAllLeadSourceUrl,
  getByIdLeadSourceUrl,
  postLeadSourceUrl,
  putLeadSourceUrl,
  staticToken,
} from "../apiServer/ApiServer";

export const postLeadSource = async (params) => {
  try {
    const response = await apiPostCallWithAuth(
      postLeadSourceUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllLeadSource = async () => {
  try {
    const response = await apiGetCallWithAuth(getAllLeadSourceUrl, staticToken);
    return response;

  } catch (error) {
    return null;
  }
};


export const deleteLeadSource = async (params) => {
  try {
    const response = await apiDeleteCallWithAuth(
      deleteLeadSourceUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const putLeadSource = async (params) => {
  try {
    const response = await apiPutCallWithAuth(
      putLeadSourceUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getByIdLeadSource = async (params) => {
  try {
    const response = await apiGetCallWithAuth(
      getByIdLeadSourceUrl,
      params,
      staticToken,
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
