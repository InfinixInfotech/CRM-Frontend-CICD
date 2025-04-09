import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { CallingEmpUrl, emp, getAllEmpCodeNameUrl, getExtensionEmpUrl, getUserByIdUrl, leadInfoUrl, persnolDetailsUrl, searchUserEmpUrl, staticToken, todayFollowUpDataUrl } from "../apiServer/ApiServer";


export const getAllEmpCodeName = async () => {
    try {
      const response = await apiGetCallWithAuth(getAllEmpCodeNameUrl, staticToken);
      return response;
    } catch (error) {
      return null;
    }
  };
  
export const getAllleadInfo = async () => {
    try {
      const response = await apiGetCallWithAuth(leadInfoUrl, staticToken);
      return response;
    } catch (error) {
      return null;
    }
  };


export const getExtensionEmp = async (empCode) => {
  try {
    const url = `${getExtensionEmpUrl}?empCode=${encodeURIComponent(empCode)}`;
    const response = await apiGetCallWithAuth(url, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};


// &leadid=${params.leadid}&ContactName=${params.ContactName}

// empCode, mobile, extension

export const postCallingEmp = async (params) => {
  try {
    const url = `${CallingEmpUrl}/${encodeURIComponent(params.mobile)}/${encodeURIComponent(params.extension)}?agentid=${emp}&leadid=${params.leadid}&ContactName=${params.ContactName}`;
    const response = await apiGetCallWithAuth(url, staticToken);
    return response;
  } catch (error) {
    return null;
  }
};


export const getUserByIdApi = async (id) => {
    try {
      const response = await apiGetCallWithAuth(`${getUserByIdUrl}?id=${id}`, staticToken);
      return response;
    } catch (error) {
      return null;
    }
  };


export const getPersnolDetailsApi = async (empCode) => {
    try {
      const response = await apiGetCallWithAuth(`${persnolDetailsUrl}?employeeCode=${empCode}`, staticToken);
      return response;
    } catch (error) {
      return null;
    }
  };

  
export const getTodayFollowUpDataApi = async (empCode) => {
    try {
      const response = await apiGetCallWithAuth(`${todayFollowUpDataUrl}?employeeCode=${empCode}`, staticToken);
      return response;
    } catch (error) {
      return null;
    }
  };

  
  export const searchUserApi = async (params) => {
    try {
      const url = `${searchUserEmpUrl}?employeeCode=${encodeURIComponent(params.employeeCode)}&employeeName=${encodeURIComponent(params.employeeName)}&CallingExt=${encodeURIComponent(params.CallingExt)}`;
      const response = await apiGetCallWithAuth(url, staticToken);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  