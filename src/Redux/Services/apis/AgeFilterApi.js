import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { AgeFilterEmpUrl, AgeFilterUrl, paidClientFilterUrl, paymentExtraFilterUrl, paymentFilterEmpUrl, paymentFilterUrl, soExtraFilterUrl, soFilteEmpUrl, soFilterUrl, staticToken, storedUsername } from "../apiServer/ApiServer";


export const getAllAgeFilter = async (filters) => {
  try {
    const queryString = Object.keys(filters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join("&");

    // Choose the URL based on the username
    const urlWithParams = (["admin", "Admin", "ADMIN"].includes(storedUsername))
      ? `${AgeFilterUrl}?${queryString}`
      : `${AgeFilterEmpUrl}?${queryString}`;

    const response = await apiGetCallWithAuth(urlWithParams, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting age filter:", error);
    return null;
  }
};



export const getAllpaymentFilter = async (filters) => {
  try {
    const queryString = Object.keys(filters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join("&");

      const keysToCheck = ["prId", "leadId", "soId", "employeeCode"];
      const shouldUpdateURL = keysToCheck.some(key => filters[key]); 
      let urlWithParams = ``;
      if (shouldUpdateURL) {
        urlWithParams = `${paymentExtraFilterUrl}?${queryString}`;
      } else {
        // Choose the URL based on the username
        urlWithParams = (["admin", "Admin", "ADMIN"].includes(storedUsername))
          ? `${paymentFilterUrl}?${queryString}`
          : `${paymentFilterEmpUrl}?${queryString}`;
      }

    const response = await apiGetCallWithAuth(urlWithParams, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting payment filter:", error);
    return null;
  }
};



// export const getPRFilter= async (filters) => {
//   try {
//     const queryString = Object.keys(filters)
//       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
//       .join("&");
//     const urlWithParams = (["admin", "Admin", "ADMIN"].includes(storedUsername))
//       ? `${paymentFilterUrl}?${queryString}`
//       : `${paymentFilterEmpUrl}?${queryString}`;

//     const response = await apiGetCallWithAuth(urlWithParams, staticToken);
//     return response;
//   } catch (error) {
//     console.error("Error getting payment filter:", error);
//     return null;
//   }
// };



export const getAllPaiddClientFilter = async (filters) => {
  try {
    const queryString = Object.keys(filters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join("&");

    const urlWithParams = `${paidClientFilterUrl}?${queryString}`;

    const response = await apiGetCallWithAuth(urlWithParams, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};


export const getAllSoFilter = async (filters) => {
  try {
    const queryString = Object.keys(filters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join("&");


    const keysToCheck = ["prId", "leadId", "soId", "employeeCode"];
    const shouldUpdateURL = keysToCheck.some(key => filters[key]); // If any key has a value, update URL
    let urlWithParams = ``;
    if (shouldUpdateURL) {
      urlWithParams = `${soExtraFilterUrl}?${queryString}`;
    } else {
      // Choose the URL based on the username
      urlWithParams = (["admin", "Admin", "ADMIN"].includes(storedUsername))
        ? `${soFilterUrl}?${queryString}`
        : `${soFilteEmpUrl}?${queryString}`;
    }

    const response = await apiGetCallWithAuth(urlWithParams, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting SO filter:", error);
    return null;
  }
};





