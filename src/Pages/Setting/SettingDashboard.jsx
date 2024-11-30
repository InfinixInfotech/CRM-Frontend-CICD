import React, { useEffect } from "react";
import NavigationButton from "../../Components/Button/NavigateButton/NavigationButton";
import { apiGetCallWithoutAuth } from "../../Utils/apiUtils";

export default function SettingDashboard() {


  // Function to fetch all the data and group by title
  const fetchData = async () => {
      try {
          const getCardResponse = await apiGetCallWithoutAuth(cardDetailsApiUrl);
          console.log(getCardResponse);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div>
      <h1>
        <center className="mt-5 bg-white rounded p-2">Setting Dashboard</center>
      </h1>

      <div className="w-100 mt-4 px-4">
        {/* Grid container */}
        <div
          className="d-grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          }}
        >
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Add Groups" to="/addgroups" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="View Groups" to="/viewgroups" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Lead Status" to="/leadstatus" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Department" to="/department" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Designation" to="/designation" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Lead Source" to="/leadsource" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Qualification" to="/qualification" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Segment Plans" to="/segmentplans" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Setting Data" to="/settingdata" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Add User" to="/adduser" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="View User" to="/viewuser" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="User Operation" to="/useroperation" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Sip Trunck" to="/siptrunck" />
          </div>
          <div className="container bg-secondary text-white text-center">
            <NavigationButton label="Segment List" to="/segmentlist" />
          </div>
        </div>
      </div>
    </div>
  );
}
