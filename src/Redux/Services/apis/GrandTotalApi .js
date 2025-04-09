import {  apiGetCallWithAuth } from "../../../Utils/apiUtils";
import {  emp, GetByempTotalGrandTotalUrl, GetTotalGrandTotalBdeUrl, GetTotalGrandTotalUrl, staticToken, storedGroupName, storedUsername } from "../apiServer/ApiServer";


export const getGrandTotal = async () => {
  try {
    let url = "";

    console.log("GroupName-------------------"+storedGroupName);

    if (["admin", "Admin", "ADMIN"].includes(storedUsername)) {
      url = `${GetTotalGrandTotalUrl}`;
    } else if (["BDE", "SBDE"].includes(storedGroupName)) {
      url = `${GetTotalGrandTotalBdeUrl}?EmpCode=${emp}`;
    } else if (["TL", "Manager", "Senior Manager", "DSH"].includes(storedGroupName)) {
      url = `${GetByempTotalGrandTotalUrl}?empCode=${emp}`;
    }

console.log("URl---------------------"+url)

    const response = await apiGetCallWithAuth(url, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting grand total:", error);
    return null;
  }
};


