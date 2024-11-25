import React from 'react'
import TotalSales from './TotalSales/TotalSales'
import TodaySales from './Todaysales/TodaySales'
import TeamMember from './TeamMember/TeamMember'
import FollowUp from './FollowUp/FollowUp'
import TodayTrial from './TodayTrial/TodayTrial'
import "./SalesDashboard.css";
import AssignedByDate from '../../../Components/Filter/AssignedByData/AssignedByData'
import LeadSource from '../../../Components/Filter/LeadSource/LeadSource'
import Manager from '../../../Components/Filter/Manager/Manager'
import SearchByMobileNumber from '../../../Components/Filter/SearchByMobileNumber/SearchByMobileNumber'
import SearchByName from '../../../Components/Filter/SearchByName/SearchByName'
import Segment from '../../../Components/Filter/Segment/Segment'
import State from "../../../Components/Filter/State/State";
import Status from "../../../Components/Filter/Status/Status";
import Filter from '../../../Components/Filter/FilterData/Filter'
import SoStatus from '../../../Components/Filter/SalesOrder/SoStatus'



export default function SalesDashboard() {
  return (
    <div className='mt-5'>
      <div class="p-2 text-center custom-bg rounded shadow-sm mt-5">
                <h1>Sales Dashboard</h1>
            </div>
      <div className='d-flex gap-3 salesDashbordCards'>
      <TotalSales/>
      <TodaySales/>
      <TeamMember/>
      <FollowUp/>
      <TodayTrial/>
      </div>
      <div className='filter-components d-grid gap-2'>
      <AssignedByDate/>
      <LeadSource/>
      <Manager/>
      <SearchByMobileNumber/>
      <SearchByName/>
      <Segment/>
      <SoStatus/>
      <State/>
      <Filter/>
      <Status/>  
      </div>
        </div>
  )
}
