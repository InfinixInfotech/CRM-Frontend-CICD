import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllLeadSourceThunk } from "../../../Redux/Services/thunks/LeadSourceThunk";
import { useDispatch } from "react-redux";

const LeadSourceFilter = () => {
  const [selectedLeadSource, setSelectedLeadSource] = useState(""); // To store selected value
  const [leadSource, setLeadSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedLeadSource(value);
  };

  //!<-------------------------------------------------------------------------------VIEW GROUPS----------------------------------------------------------------------------------------------------------->

  useEffect(() => {
    const fetchLeadSourceData = async () => {
      try {
        const response = await dispatch(getAllLeadSourceThunk()).unwrap();
        console.log("API Response: ", response);

        if (response.success && Array.isArray(response.data)) {
          setLeadSource(response.data); // Set fetched data as options
        } else {
          console.error("Invalid response format: ", response);
          setLeadSource([]); // Reset options if invalid
        }
      } catch (error) {
        console.error("Error fetching LeadSource: ", error);
        setLeadSource([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadSourceData();
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex flex-column align-items-start">
        <div className="dropdown w-75">
          <label>Lead Source</label>
          <select
            className="form-select"
            aria-label="Select Lead Source"
            value={selectedLeadSource}
            name="groupName"
            onChange={handleChange}
            disabled={isLoading || leadSource.length === 0}
          >
            <option value="" disabled>
              Select Lead Source
            </option>

            {leadSource.length > 0 ? (
              leadSource.map((leadSrc) => (
                <option key={leadSrc.id} value={leadSrc.leadSourceValue}>
                  {leadSrc.leadSourceValue}
                </option>
              ))
            ) : (
              <option disabled>No Lead Source Available</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LeadSourceFilter;
