import React from 'react';
const isLive = true;
const envUrl = import.meta.env.VITE_API_URL;
const apiUrl = isLive ? envUrl : '';
  

export const postLeadStatusUrl = `${apiUrl}/api/LeadStatus/InsertLeadStatus`;
export const getAllLeadStatusUrl = `${apiUrl}/api/LeadStatus/GetAllLeadStatus`;
export const putLeadStatusUrl = `${apiUrl}/api/LeadStatus/UpdateLeadStatus`;
export const deleteLeadStatusUrl = `${apiUrl}/api/LeadStatus/DeleteLeadStatus`;
export const getByIdLeadStatusUrl = `${apiUrl}/api/LeadStatus/GetLeadStatusById`;
// -----------------------------------------------------------------------------------------------------------
export const postLeadSourceUrl = `${apiUrl}/api/LeadSource/InsertLeadSource`;
export const putLeadSourceUrl = `${apiUrl}/api/LeadSource/UpdateLeadSource`;
export const deleteLeadSourceUrl = `${apiUrl}/api/LeadSource/DeleteLeadSource`;
export const getAllLeadSourceUrl = `${apiUrl}/api/LeadSource/GetAllLeadSource`;
export const getByIdLeadSourceUrl = `${apiUrl}/api/LeadSource/GetLeadSourceById`;
// -----------------------------------------------------------------------------------------------------------
export const postDepartmentUrl = `${apiUrl}/api/LeadStatus/GetLeadStatusById`;
export const postSegmentListUrl = `${apiUrl}/api/Segment/InsertSegmentAsync`;
export const postQualificationUrl = `${apiUrl}/api/Qualification/InsertQualificationAsync`;
export const postSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/InsertSegmentPlanAsync`;
export const postAddUserUrl = `${apiUrl}/api/Users/AddUsers`;
export const postGroupsUrl = `${apiUrl}/api/Groups/InsertGroups`
export const staticToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNmZiOTNlOS1lMzVjLTQ0NjktYjU2Mi00ZjM1Njg4ZWIxN2MiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImlhdCI6MTczMzEyODk3MSwiSXNBZG1pbiI6InRydWUiLCJleHAiOjE3NjQ2NjQ5NzEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODIvIn0.NOSgVb8iz3rWk-Veu0FLRJLQIYnZvWDkPdKbpToGR30`


export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
