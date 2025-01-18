import React, { useState } from "react";

const ActionFilter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [ActionData, setActionData] = useState("");

  const handleActionData = (event) => {
    setActionData(event.target.value);
  };

  const ActionDataOptions = [{ value: "ActionName", label: "Action Name" }];

  return (
    <div>
      <div className="dropdown-content-ActionData w-75">
        <label>Action</label>
        <select
          value={ActionData}
          onChange={handleActionData}
          name="employee"
          id="employee-dropdown"
          className="form-select "
        >
          {ActionDataOptions.map((option) => (
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

export default ActionFilter;
