import { apiGetCallWithAuth } from "../../../Utils/apiUtils";
import { emp, GetYesterdayTotalBDEUrl, GetYesterdayTotalDSHUrl, GetYesterdayTotalUrl, staticToken, storedGroupName, storedUsername } from "../apiServer/ApiServer";

export const getYerterdayTotal = async () => {
  try {
    //const urlWithId = ``;
    let urlWithId = "";
    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      urlWithId = `${GetYesterdayTotalUrl}`;
    } else if (["BDE", "SBDE"].includes(storedGroupName)) {
      urlWithId = `${GetYesterdayTotalBDEUrl}?employeeCode=${emp}`;
    } else if (["TL", "Manager", "Senior Manager", "DSH"].includes(storedGroupName)) {
      urlWithId = `${GetYesterdayTotalDSHUrl}?empCode=${emp}`;
    }
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response;
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};