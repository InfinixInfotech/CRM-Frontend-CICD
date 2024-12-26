import React from 'react';
const isLive = false;
const envUrl = import.meta.env.VITE_API_URL;
const apiUrl = isLive ? envUrl : '';
  
//-----------------------------------LeadStatus Api's------------------------------------------------------------------
export const postLeadStatusUrl = `${apiUrl}/api/LeadStatus/InsertLeadStatus`;
export const getAllLeadStatusUrl = `${apiUrl}/api/LeadStatus/GetAllLeadStatus`;
export const putLeadStatusUrl = `${apiUrl}/api/LeadStatus/UpdateLeadStatus`;
export const deleteLeadStatusUrl = `${apiUrl}/api/LeadStatus/DeleteLeadStatus`;
export const getByIdLeadStatusUrl = `${apiUrl}/api/LeadStatus/GetLeadStatusById`;
// --------------------------------LeadSource Api's---------------------------------------------------------------------------
export const postLeadSourceUrl = `${apiUrl}/api/LeadSource/InsertLeadSource`;
export const putLeadSourceUrl = `${apiUrl}/api/LeadSource/UpdateLeadSource`;
export const deleteLeadSourceUrl = `${apiUrl}/api/LeadSource/DeleteLeadSource`;
export const getAllLeadSourceUrl = `${apiUrl}/api/LeadSource/GetAllLeadSource`;
export const getByIdLeadSourceUrl = `${apiUrl}/api/LeadSource/GetLeadSourceById`;
// ----------------------------------Department Api's--------------------------------------------------------------------------------------
export const postDepartmentUrl = `${apiUrl}/api/Department/CreateDepartmentAsync`;
export const putDepartmentUrl  = `${apiUrl}/api/Department/UpdateDepartmentAsync`;
export const deleteDepartmentUrl = `${apiUrl}/api/Department/DeleteDepartmentAsync`;
export const getAllDepartmentUrl = `${apiUrl}/api/Department/GetAllDepartmentAsync`;
export const getByIdDepartmentUrl = `${apiUrl}/api/Department/GetDepartmentById`;
//------------------------------------Qualification Api's-----------------------------------------------------------------------------------------
export const postQualificationUrl = `${apiUrl}/api/Qualification/InsertQualificationAsync`;
export const putQualificationUrl  = `${apiUrl}/api/Qualification/UpdateQualificationByIdAsync`;
export const deleteQualificationUrl =`${apiUrl}/api/Qualification/DeleteQualificationByIdAsync`;
export const getAllQualificationUrl =`${apiUrl}/api/Qualification/GetAllQualificationAsync`;
export const getByIdQualificationUrl =`${apiUrl}/api/Qualification/GetQualificationById`;
// ------------------------------------SegmentList Api's---------------------------------------------------------------------------------------------
export const postSegmentListUrl = `${apiUrl}/api/Segment/InsertSegmentAsync`;
export const putSegmentListUrl = `${apiUrl}/api/Segment/UpdateSegmentByIdAsync`;
export const deleteSegmentListUrl = `${apiUrl}/api/Segment/DeleteSegmentByIdAsync`;
export const getAllSegmentListUrl = `${apiUrl}/api/Segment/GetAllSegmentAsync`;
export const getByIdSegmentListUrl = `${apiUrl}/api/Segment/GetSegmentById`;
// -------------------------------------SegmentPlan Api's--------------------------------------------------------------------------------------------
export const postSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/InsertSegmentPlanAsync`;
export const putSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/UpdateSegmentPlanByIdAsync`;
export const deleteSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/DeleteSegmentPlanByIdAsync`;
export const getAllSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/GetAllSegmentPlanAsync`;
export const getByIdSegmentPlanUrl = `${apiUrl}/api/SegmentPlan/GetSegmentById`;
// --------------------------------------AddUser Api's----------------------------------------------------------------------------------------------------
export const postUserUrl = `${apiUrl}/api/Users/AddUsers`; 
export const putUserUrl = `${apiUrl}/api/Users/UpdateUsersById`;
export const getAllUserUrl = `${apiUrl}/api/Users/GetAllUsers `;
export const getByIdUserUrl = `${apiUrl}/api/Users/GetUserById`;
// --------------------------------------Groups Api's----------------------------------------------------------------------------------------------------
export const postGroupsUrl = `${apiUrl}/api/Groups/InsertGroups`;
export const putGroupsUrl = `${apiUrl}/api/Groups/UpdateByIdGroups`;
export const deleteGroupsUrl = `${apiUrl}/api/Groups/DeleteByIdGroups`;
export const getAllGroupsUrl = `${apiUrl}/api/Groups/GetAllGroups`;
export const getByIdGroupsUrl = `${apiUrl}/api/Groups/GetGroupsById`;
//--------------------------------------Sales Order-------------------------------------------------------------------------------------------------------
export const postSalesOrderUrl = `${apiUrl}/api/SO/InsertSO`;
export const putSalesOrderUrl = `${apiUrl}/api/SO/UpdateSO`;
export const deleteSalesOrderUrl = `${apiUrl}/api/SO/DeleteSO`;
export const getAllSalesOrderUrl = `${apiUrl}/api/SO/GetAllSO `;
export const getByIdSalesOrderUrl = `${apiUrl}/api/SO/GetSOById`;
// ---------------------------------------------PaymentRise Api's--------------------------------------------------------------------------------------------------------------
export const postLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/AddLeadPR`;
export const putLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/UpdateLeadPRById`;
export const deleteLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/DeleteLeadPRById`;
export const getAllLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/GetAllLeadPR`;
export const getByIdLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/GetLeadPRById`;
// ---------------------------------------------AddLeads Api's----------------------------------------------------------------------------
export const postAddLeadUrl = `${apiUrl}/api/Lead/AddLead`;
export const putAddLeadUrl = `${apiUrl}/api/Lead/UpdateLeadById`;
export const deleteAddLeadUrl = `${apiUrl}/api/Lead/DeleteLeadById`;
export const getAllAddLeadUrl = `${apiUrl}/api/Lead/GetAllLead`;
export const getByIdAddLeadUrl = `${apiUrl}/api/Lead/GetLeadById`;
// ---------------------------------------------UploadLead Api's----------------------------------------------------------------------------
export const postUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/UploadBulkLead`;
export const fetchAllUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/CustomeFetchLeads`;
export const GetByIdUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/GetLeadByEmployeeCode`;


export const staticToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMzg2MDI5Mi04NzAzLTRmMzEtYjIzYS0zZjgwODUyYzFjNzkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImlhdCI6MTczNDYwNDM0OCwiSXNBZG1pbiI6InRydWUiLCJleHAiOjE3NjYxNDAzNDgsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODIvIn0.Mmaz8WaZrAbJ1IVIxsRDtgkIaAb7VxBAGrNhFRum6vA'


export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
