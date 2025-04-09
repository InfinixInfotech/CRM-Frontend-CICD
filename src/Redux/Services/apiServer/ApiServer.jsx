import React from 'react';
const isLive = true;
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
export const getAllUserUrl = `${apiUrl}/api/Users/GetAllUsers`;
export const getByIdUserUrl = `${apiUrl}/api/Users/GetUserById`;
export const searchUserEmpUrl = `${apiUrl}/api/Users/SearchUsers`;
// --------------------------------------Groups Api's----------------------------------------------------------------------------------------------------
export const postGroupsUrl = `${apiUrl}/api/Groups/InsertGroups`;
export const putGroupsUrl = `${apiUrl}/api/Groups/UpdateByIdGroups`;
export const deleteGroupsUrl = `${apiUrl}/api/Groups/DeleteByIdGroups`;
export const getAllGroupsUrl = `${apiUrl}/api/Groups/GetAllGroups`;
export const getByIdGroupsUrl = `${apiUrl}/api/Groups/GetGroupsById`;
//--------------------------------------Sales Order-------------------------------------------------------------------------------------------------------
export const postSalesOrderUrl = `${apiUrl}/api/SO/InsertSO`;
export const createSalesOrderUrl = `${apiUrl}/api/SO/InsertSO`;
export const putSalesOrderUrl = `${apiUrl}/api/SO/UpdateSO`;
export const deleteSalesOrderUrl = `${apiUrl}/api/SO/DeleteSO`;
export const getAllSalesOrderUrl = `${apiUrl}/api/SO/GetAllTeamSO`;
export const getAllSOUrl = `${apiUrl}/api/SO/GetAllSO`;
export const getByIdSalesOrderUrl = `${apiUrl}/api/SO/GetSOById`;
// ---------------------------------------------PaymentRise Api's--------------------------------------------------------------------------------------------------------------
export const postLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/AddLeadPR`;
export const putLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/UpdateLeadPRById`;
export const deleteLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/DeleteLeadPRById`;
export const getAllLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/GetAllTeamPR`;
export const getByIdLeadPaymentRaiseUrl = `${apiUrl}/api/LeadPaymentRaise/GetLeadPRById`;
export const getAllPRUrl = `${apiUrl}/api/LeadPaymentRaise/GetAllLeadPR`;
export const serachFilterPRurl = `${apiUrl}/api/LeadPaymentRaise/GetSearchEmployeeDetails`;
// ---------------------------------------------AddLeads Api's----------------------------------------------------------------------------
export const postAddLeadUrl = `${apiUrl}/api/Lead/AddLead`;
export const putAddLeadUrl = `${apiUrl}/api/Lead/UpdateLeadById`;
export const deleteAddLeadUrl = `${apiUrl}/api/Lead/DeleteLeadById`;
export const getAllAddLeadUrl = `${apiUrl}/api/Lead/GetAllLead`;
export const getByIdAddLeadUrl = `${apiUrl}/api/Lead/GetLeadById`;
// ---------------------------------------------UploadLead Api's----------------------------------------------------------------------------
export const CreateDesignationUrl = `${apiUrl}/api/Designation/CreateDesignation`;
export const UpdateDesignationUrl = `${apiUrl}/api/Designation/UpdateDesignation`;
export const GetAllDesignationUrl = `${apiUrl}/api/Designation/GetAllDesignation`;
export const fetchByIdDesignationUrl = `${apiUrl}/api/Designation/GetDesignationById`;
export const deleteDesignationUrl = `${apiUrl}/api/Designation/DeleteDesignation`;
// ---------------------------------------------UploadLead Api's----------------------------------------------------------------------------
export const postUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/UploadBulkLead`;
export const fetchAllUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/CustomeFetchLeads`;
export const GetByIdUploadBulkLeadUrl = `${apiUrl}/api/BulkLead/GetLeadsByEmployeecodeFillters`;
export const GetByBulkLeadUrl = `${apiUrl}/api/BulkLead/GetAllBulkLead`;
export const UpdateByIdBulkLeadUrl = `${apiUrl}/api/BulkLead/UpdateLeadById`;
export const followUpDetailsUrl = `${apiUrl}/api/BulkLead/GetFollowUpByEmployeecodeFillters`;
export const followUpDetailsFilterTillDateUrl = `${apiUrl}/api/BulkLead/GetFollowUpByEmployeecodeFillterTillDate`;
export const DisposeDataUrl = `${apiUrl}/api/BulkLead/DisposeLead`;
export const leadInfoUrl = `${apiUrl}/api/BulkLead/GetLeadInfo`;
// ---------------------------------------------Search Api's----------------------------------------------------------------------------
export const GetLeadByMobileOrLeadIdUrl = `${apiUrl}/api/BulkLead/SearchLead`;
export const GetLeadByMobileOrLeadIdAdminUrl = `${apiUrl}/api/BulkLead/SearchLeadByMobileNoandLeadId`;
export const loginUrl = `${apiUrl}/api/Auth/login`;
export const logOutUrl = `${apiUrl}/api/Auth/logout`;
export const userHistoryUrl = `${apiUrl}/api/LeadHistory/GetByEmployeeCode`;
export const forgetPassUrl = `${apiUrl}/api/Auth/UpdatePassword`;
// export const campaignName = `${apiUrl}/api/BulkLead/GetAllCampaignNames`;
// ---------------------------------------------Paid Clients Api's----------------------------------------------------------------------------
export const GetPaidClientByEmpCodeUrl = `${apiUrl}/api/PaidClient/GetAllTeamPaidClient`;
export const GetcampaignNameByEmpCodeUrl = `${apiUrl}/api/BulkLead/GetAllCompaignName`;
export const GetAllPaidClientUrl = `${apiUrl}/api/PaidClient/GetAllPaidClient`;
export const GetAllEmployeeSalesReport = `${apiUrl}/api/PaidClient/SalesReportByHirarchy`;
export const GetAllSMSByEmployeeCode = `https://mailboxapi.infinixinfotech.in/api/SMS/GetSMSByEmployeeCode`;

export const GetTotalGrandTotalUrl = `${apiUrl}/api/PaidClient/GetTotalGrandTotalForCurrentMonth`;
// /api/SO/GetHirarchyByEmployeeCode
export const GetByempTotalGrandTotalUrl = `${apiUrl}/api/PaidClient/GetTeamTargetOfDSH`;
export const GetTotalGrandTotalBdeUrl = `${apiUrl}/api/PaidClient/GetTargetFromPaidClient`;


export const GetTodayTotalUrl = `${apiUrl}/api/PaidClient/GetTodayGrandTotalSum`;
export const GetTodayTotalEmpUrl = `${apiUrl}/api/PaidClient/GetTodaySalesByEmployeeCode`;

export const GetYesterdayTotalUrl = `${apiUrl}/api/PaidClient/GetYesterdayGrandTotalSum`;
export const GetYesterdayTotalDSHUrl = `${apiUrl}/api/PaidClient/GetSumOfGrandTotalTillLastDate`;
export const GetYesterdayTotalBDEUrl = `${apiUrl}/api/PaidClient/GetYesterdayGrandTotalSumByEmployeecode`;

export const GetTargetByEmployeeCode = `${apiUrl}/api/PaidClient/GetTargetAchievedByEmployeeCode`;

export const GetAllImage = `${apiUrl}/api/Image/GetAll`;
export const UploadImag = `${apiUrl}/api/Image/UploadImage`;
export const UploadPolicyUrl = `${apiUrl}/api/Policys/UploadPolicy`;
export const GetAllPolicyUrl = `${apiUrl}/api/Policys/GetAll`;
export const DeleteByIdPolicyUrl = `${apiUrl}/api/Policys/DeleteById`;

export const AgeFilterUrl = `${apiUrl}/api/BulkLead/GetLeadsByEmployeecodeFillters`;
export const AgeFilterEmpUrl = `${apiUrl}/api/BulkLead/GetLeadsByEmployeecodeFillters`;

export const paymentFilterUrl = `${apiUrl}/api/LeadPaymentRaise/GetLeadsFillters`;
export const paymentFilterEmpUrl = `${apiUrl}/api/LeadPaymentRaise/GetLeadsByEmployecodeFillters`;
export const paymentExtraFilterUrl = `${apiUrl}/api/LeadPaymentRaise/GetSearchEmployeeDetails`;

export const soFilterUrl = `${apiUrl}/api/SO/GetLeadsFillters`;
export const soFilteEmpUrl = `${apiUrl}/api/SO/GeSOByEmployeecodeFillters`;
export const soExtraFilterUrl = `${apiUrl}/api/SO/GetSearchEmployeeDetails`;

export const paidClientFilterUrl = `${apiUrl}/api/PaidClient/GetSearchEmployeeDetails`;
export const paidClientFilterEmpUrl = `${apiUrl}/api/PaidClient/GePCByEmployeecodeFillters`;


export const createPoolAccessUrl = `${apiUrl}/api/Pool/CreatePool`;
export const getAllPoolAccessUrl = `${apiUrl}/api/Pool/GetAllPool`;
export const UpdatePoolAccessUrl = `${apiUrl}/api/Pool/UpdatePoolByPoolName`;
export const DeletePoolAccessUrl = `${apiUrl}/api/Pool/DeleteByPoolIdAsync`;


export const StateFilterUrl = `${apiUrl}/api/BulkLead/GetAllBulkLeadByStateOrCity`;
export const getAllEmpCodeNameUrl = `${apiUrl}/api/SMS/GetAllEmployeeCodeAndName`;
export const getChatByToAndFromUrl = `${apiUrl}/api/Chat/GetChatByToAndFrom`;
export const postChatUrl = `${apiUrl}/api/Chat/PostChat`;
export const getAllChatsUrl = `${apiUrl}/api/Chat/GetAllChats?pageNumber=1&limit=200`;
export const getUserByIdUrl = `${apiUrl}/api/Users/GetUserById`;
export const getExtensionEmpUrl = `${apiUrl}/api/Users/GetExtensionByEmployeeCode`;
export const persnolDetailsUrl = `${apiUrl}/api/Users/GetPersonalDetailByEmployeeCode`;
export const todayFollowUpDataUrl = `${apiUrl}/api/BulkLead/GetFollowUpByEmployeecodeTodayFillters`;
export const CallingEmpUrl = `https://varapi.infinixinfotech.in/api/Call/CTCV3`;


export const getSearchLeadMobileNoUrl = `${apiUrl}/api/BulkLead/GetSearchLeadMobileNo`;

// export const getAllEmpCodeNameUrl = `${apiUrl}/api/SMS/GetAllEmployeeCodeAndName`;

export const staticToken =localStorage.getItem("authToken")
export const emp= localStorage.getItem("empCode")
export const storedUsername = localStorage.getItem("userName");
export const storedGroupName = localStorage.getItem("groupName");
export const storedEmailId = localStorage.getItem("emailId");
// export  const username=  localStorage.getItem("username")

export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
