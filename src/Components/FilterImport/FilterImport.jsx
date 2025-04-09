import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgeFilterThunk } from "../../Redux/Services/thunks/AgeFilterThunk";
import { getsearchStatefilterThunk } from "../../Redux/Services/thunks/StateFilterThunks";
import { useNavigate } from "react-router-dom";

export default function FilterImport() {
  const dispatch = useDispatch();
  const [filterData, setfilterData] = useState([]);
  const [selectedLeadSource, setSelectedLeadSource] = useState("All");
  const [ageBetween1, setAgeBetween1] = useState("");
  const [ageBetween2, setAgeBetween2] = useState("");
  const [State, setState] = useState("All");
  const [City, setCity] = useState("");
  const [leadStatus, setLeadStatus] = useState("All");
  const [segment, setSegment] = useState("");
  const [pageNumber] = useState(1);
  const [limit] = useState(10);
  
  const { data: ageFilterData } = useSelector((state) => state.agefilter);
  const { data: searchStateData } = useSelector((state) => state.searchstatefilter);
  const Navigate = useNavigate();

  const indianStates = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  // Fetch Leads Data
  const fetchLeads = () => {
    const filters = {
      agebetween1: ageBetween1 || "",
      agebetween2: ageBetween2 || "",
      LeadSource: selectedLeadSource === "All" ? "" : selectedLeadSource,
      LeadStatus: leadStatus === "All" ? "" : leadStatus,
      Segment: segment || "",
      state: State === "All" ? "" : State,
      city: City || "",
      pageNumber,
      limit,
    };
    dispatch(getAllAgeFilterThunk(filters));
  };

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "selectedLeadSource":
        setSelectedLeadSource(value);
        break;
      case "leadStatus":
        setLeadStatus(value);
        break;
      case "segment":
        setSegment(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "ageRange":
        if (value === "All") {
          setAgeBetween1("");
          setAgeBetween2("");
        } else {
          const [min, max] = value.split("-").map(Number);
          setAgeBetween1(min);
          setAgeBetween2(max);
        }
        break;
      default:
        break;
    }
  };

  // Debounced API Calls for Filters (300ms delay)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedLeadSource, ageBetween1, ageBetween2, leadStatus, segment, State, City, pageNumber, limit, dispatch]);

 
  useEffect(() => {
    if (ageFilterData) {
      setfilterData(ageFilterData);
    }
  }, [ageFilterData]);

  useEffect(() => {
    if (searchStateData) {
      setfilterData(searchStateData);
    }
  }, [searchStateData]);

  // Navigate when data is available
  // useEffect(() => {
  //   Navigate(`/viewleads`, { state: { filterData } });
  // }, [filterData]);

  return (
    <div className="bg-white border border-2 p-4">
      {/* Filters Row */}
      <div className="d-flex align-items-center gap-3 flex-wrap">
        
        {/* Lead Source Filter */}
        <div>
          <label className="form-label">Lead Source</label>
          <select className="form-select input-box" name="selectedLeadSource" value={selectedLeadSource} onChange={handleChange}>
            <option value="All">All</option>
            <option value="Additional Pool">Additional Pool</option>
            <option value="Fresh Pool">Fresh Pool</option>
            <option value="Diamond Pool">Diamond Pool</option>
            <option value="Platinum Pool">Platinum Pool</option>
            <option value="HNI Pool">HNI Pool</option>
            <option value="Dispose Pool">Dispose Pool</option>
          </select>
        </div>

        {/* Age Range Filter */}
        <div>
          <label className="form-label">Search By Age</label>
          <select className="form-select input-box" name="ageRange" value={ageBetween1 && ageBetween2 ? `${ageBetween1}-${ageBetween2}` : "All"} onChange={handleChange}>
            <option value="All">All</option>
            <option value="18-25">18 - 25 years</option>
            <option value="26-35">26 - 35 years</option>
            <option value="36-45">36 - 45 years</option>
            <option value="46-55">46 - 55 years</option>
            <option value="56-65">56 - 65 years</option>
            <option value="66-75">66 - 75 years</option>
          </select>
        </div>

        {/* Lead Status Filter */}
        <div>
          <label className="form-label">Lead Status</label>
          <select className="form-select input-box" name="leadStatus" value={leadStatus} onChange={handleChange}>
            <option value="All">All</option>
            <option value="1">BUSY</option>
            <option value="2">FUTURE FOLLOWUP</option>
            <option value="3">INTERESTED</option>
            <option value="4">NOT INTERESTED</option>
            <option value="5">NOT REACHABLE</option>
            <option value="6">NPC</option>
            <option value="7">PAID CLIENT</option>
            <option value="8">SWITCH OFF</option>
          </select>
        </div>

        {/* Segment Filter */}
        <div>
          <label className="form-label">Segment</label>
          <input type="text" className="form-control input-box" name="segment" placeholder="Enter Segment" value={segment} onChange={handleChange} />
        </div>

        {/* State Filter */}
        <div>
          <label className="form-label">Select State</label>
          <select className="form-select input-box" name="state" value={State} onChange={handleChange}>
            {indianStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
