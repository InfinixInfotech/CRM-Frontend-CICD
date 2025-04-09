import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgeFilterThunk } from "../../../Redux/Services/thunks/AgeFilterThunk";

const AgeFilter = () => {
  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { data, loading, error } = useSelector((state) => state.agefilter);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    setSearchTriggered(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && age !== "") {
      dispatch(getAllAgeFilterThunk(age));
      setSearchTriggered(true);
    }
  };
  return (
    <div className="w-75">
      <label htmlFor="age-input" className="form-label fw-bold">
        Search By Age
      </label>
      <input
        type="number"
        id="age-input"
        className="form-control input-box"
        placeholder="Enter age "
        value={age}
        onChange={handleAgeChange}
        onKeyPress={handleKeyPress}
      />
      <div className="mt-3">
        {loading && searchTriggered && <p>Loading...</p>}
        {error && <p className="text-danger">Error fetching data</p>}
        {data?.length > 0 && (
          <ul className="list-group">
            {data.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.name} - {item.age} years old
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default AgeFilter;
