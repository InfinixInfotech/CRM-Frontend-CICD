import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesDashboard from "./Pages/Dashboard/SalesDashboard/SalesDashboard";
import CallingDashboard from "./Pages/Dashboard/Callingdashboard/Calling";
import Navbar from "./Components/Navbar/Navbar";
import SettingDashboard from "./Pages/Setting/SettingDashboard";
import ViewGroups from "./Pages/Setting/Groups/ViewGroups/ViewGroups";
import AddGroups from "./Pages/Setting/Groups/AddGroups/AddGroups";
import LeadStatus from "./Pages/Setting/Leads/LeadStatus/LeadStatus";
import Department from "../src/Pages/Setting/Department/Department";
import Designation from "./Pages/Setting/Designation/Designation";
import LeadSource from "./Pages/Setting/Leads/LeadSource/LeadSource";
import Qualification from "./Pages/Setting/Qualification/Qualification";
import SegmentPlans from "./Pages/Setting/Segment/SegmentPlans/SegmentPlans";
import SettingData from "./Pages/Setting/SettingData/SettingData";
import SegmentList from "./Pages/Setting/Segment/SegmentList/SegmentList";
import SipTrunck from "./Pages/Setting/SipTrunck/SipTrunck";
import AddUser from "./Pages/Setting/User/AddUser/AddUser";
import ViewUser from "./Pages/Setting/User/ViewUser/ViewUser";
import UserOperation from "./Pages/Setting/User/UserOperation/UserOperation";
import ProfileDashbord from "./Pages/Profile/ProfileDashbord";
import SalesOrder from "./Pages/SalesOrder/salesOrder";
import Payment from "./Pages/Payment/Payment";
import ViewLeads from "./Pages/Leads/ViewLeads/ViewLeads";
import AddLeads from "./Pages/Leads/AddLeads/AddLeads";
import UploadLeads from "./Pages/Leads/UploadLeads/UploadLeads";
import ViewMarketingLeads from "./Pages/Leads/ViewMarketingLeads/ViewMarketingLeads";
import store from "./Redux/Storage/store";
import { Provider } from "react-redux";
import MailBox from "./Pages/MailBox/MailBox";
import Drafts from "./Pages/MailBox/Drafts/Drafts";
import SentMail from "./Pages/MailBox/SentMail/SentMail";
import Starred from "./Pages/MailBox/Starred/Starred";
import PaymentRaise from "./Pages/PaymentRaise/PaymentRaise";
// import EditSalesOreder from './Pages/SalesOrder/editSalesOrder'
import Login from './Components/Login/Login'
import ProtectedRoute from './Components/ProtectRoute/ProtectRoute'
import EditPaymentRaise from "./Pages/PaymentRaise/EditPaymentRaise";
import EditUser from "./Pages/Setting/User/EditUser/EditUser";
import EditGroups from "./Pages/Setting/Groups/EditGroups/EditGroups";
import UserHistory from "./Pages/UserHistory/UserHistory";
 import InsertSalesorder from "./Pages/SalesOrder/InsertSalesOrder"
import EditSalesOrder from "./Pages/SalesOrder/EditSalesOrder";
import FollowUp from "./Pages/FollowUp/FollowUp"
import EditLeads from "./Pages/Leads/EditLeads/EditLeads";
import Policies  from "./Pages/Policies/Policies";
import HrPolicies from "./Pages/Policies/HrPolicies/HrPolicies";
import IncentivePlans from "./Pages/Policies/IncentivePlans/IncentivePlans";
import LeavePolicy from "./Pages/Policies/LeavePolicy/LeavePolicy";
import Probation from "./Pages/Policies/Probation/Probation";
import TableSearch from "./Components/Filter/SearchByMobileNumberFilter/TableSearch/TableSearch";
import PaidClients from "./Pages/Clients/PaidClients/PaidClients";

export default function App() {
  const username = localStorage.getItem("username");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login/>} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div>
                  <Navbar />

                  <div className="d-flex">

                  <Sidebar />
                  <div className="p-4" style={{ flex: 1 }}>
                  <Routes>
                    {/* <Route path="/salesdashboard" element={<Dashboard />} /> */}
                    <Route path="/salesdashboard" element={<SalesDashboard />} />
                    <Route path="/callingdashboard" element={<CallingDashboard />} />
                    
                    {username && ["admin", "Admin", "ADMIN"].includes(username) && (
                          <Route path="/settingdashboard" element={<SettingDashboard />} />
                        )}
                    <Route path="/profiledashbord" element={<ProfileDashbord />} />
                    <Route path="/viewgroups" element={<ViewGroups />} />
                    <Route path="/addgroups" element={<AddGroups />} />
                    <Route path="/leadstatus" element={<LeadStatus />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/designation" element={<Designation />} />
                    <Route path="/leadsource" element={<LeadSource />} />
                    <Route path="/qualification" element={<Qualification />} />
                    <Route path="/segmentplans" element={<SegmentPlans />} />
                    <Route path="/settingdata" element={<SettingData />} />
                    <Route path="/segmentlist" element={<SegmentList />} />
                    <Route path="/siptrunck" element={<SipTrunck />} />
                    <Route path="/adduser" element={<AddUser />} />
                    <Route path="/viewuser" element={<ViewUser />} />
                    <Route path="/useroperation" element={<UserOperation />} />
                    <Route path="/salesorder" element={<SalesOrder />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/addleads" element={<AddLeads />} />
                    <Route path="/uploadleads" element={<UploadLeads />} />
                    <Route path="/viewmarketingleads" element={<ViewMarketingLeads />} />
                    <Route path="/mailbox" element={<MailBox />} />
                    <Route path="/followup" element={<FollowUp/>} />
                    <Route path="/drafts" element={<Drafts />} />
                    <Route path="/sentmail" element={<SentMail />} />
                    <Route path="/starred" element={<Starred />} />
                    <Route path="/viewleads" element={<ViewLeads />} />
                    <Route path="/paymnetRaise/:id" element={<PaymentRaise />} />
                    <Route path="/addsalesorder/:id" element={<InsertSalesorder />} />
                    <Route path="/editso/:id" element={<EditSalesOrder/>} />
                    <Route path="/editpr/:id" element={<EditPaymentRaise />} />
                    <Route path="/edituser/:id" element={<EditUser/>} />
                    <Route path="/editgroups/:id" element={<EditGroups/>} />
                    <Route path="/editleads/:id" element={<EditLeads/>} />
                    <Route path="/userhistory" element={<UserHistory/>} />
{/* //!-----------------------------------Policies Routs------------------------------------------ */}
                    <Route path="/policies" element={<Policies/>} />
                    <Route path="/hrpolicy" element={<HrPolicies/>} />
                    <Route path="/incentiveplans" element={<IncentivePlans/>} />
                    <Route path="/leavepolicy" element={<LeavePolicy/>} />
                    <Route path="/probation" element={<Probation/>} />
                    <Route path="/tablesearch" element={<TableSearch/>} />
                    <Route path="/paidclients" element={<PaidClients/>} />
                  </Routes>
                  </div>
                </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
