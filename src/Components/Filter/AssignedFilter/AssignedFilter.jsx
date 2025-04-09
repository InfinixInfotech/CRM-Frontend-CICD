import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AssignedFilter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [assigned, setAssigned] = useState("");

  const handleAssignedData = (event) => {
    setAssigned(event.target.value);
  };

  const AssignedDataOptions = [{ value: "Assigned", label: "Assigned" }];

  return (
    <div>
      <div className="d-flex flex-column align-items-start">
        <div className="dropdown w-75">
          <label>Assigned</label>
          <select
            className="form-select input-box"
            value={assigned}
            onChange={handleAssignedData}
            aria-label="Select Assigned"
          >
            <option value="" disabled>
              Select Assigned
            </option>
            {AssignedDataOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AssignedFilter;
