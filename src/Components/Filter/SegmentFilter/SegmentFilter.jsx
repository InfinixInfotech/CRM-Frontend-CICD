import React, { useState } from "react";

const SegmentFilter = () => {
  const [IsDropDown, setIsDropDown] = useState(false);
  const [segment, setSegment] = useState("");

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState);
  };
  const handleSegment = (event) => {
    setSegment(event.target.value);
  };

  const segmentOption = [
    { value: "gold", lable: "Gold" },
    { value: "stockCash", lable: "Stock Cash" },
    { value: "stockOption", lable: "Stock Option" },
  ];
  return (
    <div>
      <div className="d-flex flex-column align-items-start">
        <div className="dropdown-content-Filter w-75">
          <label>Segment</label>
          <select
            value={segment}
            className="form-select"
            onChange={handleSegment}
            name="segment"
            id="segment-dropdown"
          >
            {segmentOption.map((option) => (
              <option key={option.value} value={option.value}>
                {option.lable}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SegmentFilter;
