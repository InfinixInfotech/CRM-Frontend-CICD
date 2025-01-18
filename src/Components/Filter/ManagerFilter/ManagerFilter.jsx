import React, { useState } from "react";

const ManagerFilter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [managerData, setManagerData] = useState("");

  const handleManagerData = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const ManagerDataOptions = [{ value: "managerName", label: "Manager Name" }];

  return (
    <div>
      <div className="dropdown-content-ManagerData w-75">
        <label>Manager</label>
        <select
          value={managerData}
          onChange={handleManagerData}
          name="employee"
          id="employee-dropdown"
          className="form-select"
        >
          {ManagerDataOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{ textIndent: "10px" }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ManagerFilter;
