import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetAllPaidClientUrl, GetPaidClientByEmpCodeUrl, staticToken, storedUsername } from "../apiServer/ApiServer";

export const getAllPaidClientsApi = async (params) => {

  try {
    // console.log("params here---------------",params);
    // const storedUsername = localStorage.getItem("userName");
    let url = '';

    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      // console.log("Admin found in the string.");
       url = `${GetAllPaidClientUrl}?pageNumber=${params.pageNumber}&limit=${params.itemsPerPage}`;

    } else {
      // console.log("Admin not found in the string.");
      url =`${GetPaidClientByEmpCodeUrl}?empCode=${emp}&pageNumber=${params.pageNumber}&limit=${params.itemsPerPage}`;
      console.log(url)
    }
    const response = await apiGetCallWithAuth(url, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};