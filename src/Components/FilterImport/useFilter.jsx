import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAgeFilterThunk } from "../../Redux/Services/thunks/AgeFilterThunk";
import { getsearchStatefilterThunk } from "../../Redux/Services/thunks/StateFilterThunks";

export const useFilter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterData, setFilterData] = useState([]);
    const [filters, setFilters] = useState({
      selectedLeadSource: "",
      ageBetween1: "",
      ageBetween2: "",
      State: "",
      City: "",
      leadStatus: "",
      segment: "",
    });
  
    const [pageNumber] = useState(1);
    const [limit] = useState(10);
    
    const { data: ageFilterData } = useSelector((state) => state.agefilter);
    const { data: searchStateData } = useSelector((state) => state.searchstatefilter);
  
    // Function to fetch lead data
    const fetchLeads = () => {
      const { ageBetween1, ageBetween2, selectedLeadSource, leadStatus, segment } = filters;
      const params = {
        agebetween1: ageBetween1 || "",
        agebetween2: ageBetween2 || "",
        LeadSource: selectedLeadSource,
        LeadStatus: leadStatus,
        Segment: segment,
        pageNumber,
        limit,
      };
      dispatch(getAllAgeFilterThunk(params));
    };
  
    // Function to fetch state data
    const fetchState = () => {
      const { State, City } = filters;
      const params = { state: State, city: City };
      dispatch(getsearchStatefilterThunk(params));
    };
  
    // Function to handle filter changes
    const onChangeFilter = (e) => {
      const { name, value } = e.target;
      
      setFilters((prev) => {
        let updatedFilters = { ...prev, [name]: value };
  
        // Clear other filters when one is selected
        if (name === "selectedLeadSource" || name === "leadStatus" || name === "segment" || name === "State" || name === "City") {
          updatedFilters = {
            selectedLeadSource: name === "selectedLeadSource" ? value : "",
            leadStatus: name === "leadStatus" ? value : "",
            segment: name === "segment" ? value : "",
            State: name === "State" ? value : "",
            City: name === "City" ? value : "",
            ageBetween1: "",
            ageBetween2: "",
          };
        }
  
        // Handle age range separately
        if (name === "ageRange") {
          const [min, max] = value.split("-").map(Number);
          updatedFilters.ageBetween1 = min;
          updatedFilters.ageBetween2 = max;
        }
  
        return updatedFilters;
      });
    };
  
    // Auto-fetch leads when filters change (Debounce: 300ms)
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (filters.selectedLeadSource || filters.ageBetween1 || filters.ageBetween2 || filters.leadStatus || filters.segment) {
          fetchLeads();
        }
      }, 300);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filters]);
  
    // Auto-fetch state data when state/city changes (Debounce: 500ms)
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (filters.State || filters.City) {
          fetchState();
        }
      }, 500);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filters.State, filters.City]);
  
    // Set data when API response arrives
    useEffect(() => {
      if (ageFilterData) setFilterData(ageFilterData?.data);
    }, [ageFilterData]);
  
    useEffect(() => {
      if (searchStateData) setFilterData(searchStateData?.data);
    }, [searchStateData]);
  
    // Navigate when data is available
    // useEffect(() => {
    //   if (filterData && Object.keys(filterData).length > 0) {
    //     navigate(`/filterdatashow`, { state: { filterData } });
    //   }
    // }, [filterData]);
  
    return {
      filters,
      onChangeFilter,
    };
  };