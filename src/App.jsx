import React from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SalesDashboard from './Pages/Dashboard/SalesDashboard/SalesDashboard'
import CallingDashboard from './Pages/Dashboard/Callingdashboard/Calling'
import Navbar from './Components/Navbar/Navbar'
// import Setting from './Pages/Setting/Setting'
import SettingDashboard from './Pages/Setting/SettingDashboard'
import ViewGroups from './Pages/Setting/Groups/ViewGroups/ViewGroups'
import AddGroups from './Pages/Setting/Groups/AddGroups/AddGroups'
import LeadStatus from './Pages/Setting/Leads/LeadStatus/LeadStatus'
import Department from '../src/Pages/Setting/Department/Department'
import Designation from './Pages/Setting/Designation/Designation'
import LeadSource from './Pages/Setting/Leads/LeadSource/LeadSource'
import Qualification from './Pages/Setting/Qualification/Qualification'
import SegmentPlans from './Pages/Setting/Segment/SegmentPlans/SegmentPlans'
// import setting

export default function App() {
  

  return (
    <BrowserRouter>
     <Navbar/>
      <div className="d-flex">
        <Sidebar />
        <div className="p-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/salesdashboard" element={<SalesDashboard />} />
            <Route path="/callingdashboard" element={<CallingDashboard />} />
            {/* <Route path="/details" element={<Details/>}/> */}
            {/* <Route path="/follow-up" element={<FollowUp />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            <Route path="/client" element={<Client />} />
            <Route path="/sales-order" element={<SalesOrder />} />
            <Route path="/payment" element={<Payment />} /> */}
            <Route path="/settingdashboard" element={<SettingDashboard />} />
            <Route path="/viewgroups" element={<ViewGroups />} />
            <Route path="/addgroups" element={<AddGroups />} />
            <Route path="/leadstatus" element={<LeadStatus/>} />
            <Route path="/department" element={<Department/>}/>
            <Route path="/designation" element={<Designation/>}/>
            <Route path="/leadsource" element={<LeadSource/>} />
            <Route path="/qualification" element={<Qualification/>}/>
            <Route path="segmentplans" element={<SegmentPlans/>}/>
            {/* <Route path="/settingdata" element={<SettingData/>}/> */}
          </Routes>   
        </div>
      </div>
    </BrowserRouter>
  )
}
