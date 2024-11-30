import React from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard'
import CallingDashboard from './Pages/Dashboard/Callingdashboard/Calling'
import Navbar from './Components/Navbar/Navbar'
import SettingDashboard from './Pages/Setting/SettingDashboard'
import ViewGroups from './Pages/Setting/Groups/ViewGroups/ViewGroups'
import AddGroups from './Pages/Setting/Groups/AddGroups/AddGroups'
import LeadStatus from './Pages/Setting/Leads/LeadStatus/LeadStatus'
import Department from '../src/Pages/Setting/Department/Department'
import Designation from './Pages/Setting/Designation/Designation'
import LeadSource from './Pages/Setting/Leads/LeadSource/LeadSource'
import Qualification from './Pages/Setting/Qualification/Qualification'
import SegmentPlans from './Pages/Setting/Segment/SegmentPlans/SegmentPlans'
import SettingData from './Pages/Setting/SettingData/SettingData'
import SegmentList from './Pages/Setting/Segment/SegmentList/SegmentList'
import SipTrunck from './Pages/Setting/SipTrunck/SipTrunck'
import AddUser from './Pages/Setting/User/AddUser/AddUser';
import ViewUser from './Pages/Setting/User/ViewUser/ViewUser';
import UserOperation from './Pages/Setting/User/UserOperation/UserOperation';
import ProfileDashbord from './Pages/Profile/ProfileDashbord'
import SalesOrder from './Pages/SalesOrder/salesOrder'
import Payment from './Pages/Payment/Payment'
import ViewLeads from './Pages/Leads/ViewLeads/ViewLeads'
import AddLeads from './Pages/Leads/AddLeads/AddLeads'
import UploadLeads from './Pages/Leads/UploadLeads/UploadLeads'
import ViewMarketingLeads from './Pages/Leads/ViewMarketingLeads/ViewMarketingLeads'
import store from './Redux/Storage/store'
import { Provider } from 'react-redux'


export default function App() {
  

  return (
 <Provider store={store}>
     <BrowserRouter>
     <Navbar/>
      <div className="d-flex">
        <Sidebar />
        <div className="p-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/salesdashboard" element={<SalesDashboard />} />
            <Route path="/callingdashboard" element={<CallingDashboard />} />
            <Route path="/settingdashboard" element={<SettingDashboard />} />
            <Route path="/profiledashbord" element={<ProfileDashbord/>} />
            <Route path="/viewgroups" element={<ViewGroups />} />
            <Route path="/addgroups" element={<AddGroups />} />
            <Route path="/leadstatus" element={<LeadStatus/>} />
            <Route path="/department" element={<Department/>}/>
            <Route path="/designation" element={<Designation/>}/>
            <Route path="/leadsource" element={<LeadSource/>} />
            <Route path="/qualification" element={<Qualification/>}/>
            <Route path="/segmentplans" element={<SegmentPlans/>}/>
            <Route path="/settingdata" element={<SettingData/>}/>
            <Route path="/segmentlist" element={<SegmentList/>}/>
            <Route path="/siptrunck" element={<SipTrunck />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/viewuser" element={<ViewUser />} />
            <Route path="/useroperation" element={<UserOperation />} />
            <Route path="/salesorder" element={<SalesOrder/>} />
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/viewleads' element={<ViewLeads/>} />
            <Route path='/addleads' element={<AddLeads/>}/>
            <Route path='/uploadleads' element={<UploadLeads/>}/>
            <Route path='/viewmarketingleads' element={<ViewMarketingLeads/>} />
          </Routes>   
        </div>
      </div>
    </BrowserRouter>
 </Provider>
  )
}
