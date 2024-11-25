import React from 'react'
import NavigationButton from '../../Components/Button/NavigateButton/NavigationButton'


export default function settingdashboard() {
  return (
    <div>
        <center className='mt-5 '>Setting </center>


       <div className=' d-flex gap-2'>
        <NavigationButton label='Add Groups' to='/addgroups'/>
        <NavigationButton label='View Groups' to='/viewgroups'/>
        <NavigationButton label='Lead Status' to='/leadstatus'/>
        <NavigationButton label='Department' to='/department'/>
        <NavigationButton label='Designation' to='/designation' />
        <NavigationButton label='Lead Source' to='/leadsource'/>
        <NavigationButton label='Qualification' to='/qualification'/>
        <NavigationButton label='Segment Plans' to='/segmentplans'/>
        <NavigationButton label='Setting Data' to='/settingdata'/>
       </div>
    </div>
  )
}

