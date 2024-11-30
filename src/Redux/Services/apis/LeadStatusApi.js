import { apiGetCallWithAuth, apiPostCallWithAuth } from "../../../Utils/apiUtils";
import { getAllLeadStatusUrl, postLeadStatusUrl, staticToken } from "../apiServer/ApiServer";

// Function to post lead status with dynamic params
export const postLeadStatus = async (params) => {
  try {
    // Use params directly
    const response = await apiPostCallWithAuth(postLeadStatusUrl, params, staticToken);
    console.log(response); // Log the response
    return response; // Return response for further use
  } catch (error) {
    console.error(error); // Log any errors
    return null; // Return null if an error occurs
  }
};


export const getAllLeadStatus = async () => {     
  try {
    const response = await apiGetCallWithAuth(getAllLeadStatusUrl, staticToken);
    console.log(response); 
    return response; 
  } catch (error) {
    console.error(error); 
    return null; 
  }
};
