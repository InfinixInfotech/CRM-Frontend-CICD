import React, { useState } from "react";

const StatusFilter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [status, setStatus] = useState("");

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const statusOptions = [
    { value: "futureFollow", label: "Future Follow" },
    { value: "interested", label: "Interested" },
    { value: "notInterested", label: "Not Interested" },
    { value: "notReachable", label: "Not Reachable" },
    { value: "npe", label: "Npe" },
    { value: "paidClient", label: "Paid Client" },
    { value: "switchOff", label: "Switch Off" },
  ];

  return (
    <div>
      <div className="dropdown-content-Status w-75">
        <label>Status</label>
        <select
          value={status}
          onChange={handleStatusChange}
          name="status"
          id="status-dropdown"
          className="form-select input-box"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatusFilter;
