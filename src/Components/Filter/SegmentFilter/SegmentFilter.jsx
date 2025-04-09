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
    { value: "Index Option", lable: "Index Option" },
    { value: "Index Future", lable: "Index Future" },
    { value: "Stock Future", lable: "Stock Future" },
    { value: "Stock Option", lable: "Stock Option" },
    { value: "Stock Cash", lable: "Stock Cash" },
  ];
  return (
    <div>
      <div className="d-flex flex-column align-items-start">
        <div className="dropdown-content-Filter w-75">
          <label>Segment</label>
          <select
            value={segment}
            className="form-select input-box"
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
