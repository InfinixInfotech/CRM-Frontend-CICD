import React, { useState } from "react";
import "./AddUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";

const AddUser = () => {
  const [user, setUser] = useState({
    fullName: "",
    employeeCode: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    userName: "",
    password: "",
    target: 0,
    departmentName: "",
    designationName: "",
    groupName: "",
    reportingTo: "",
    qualificationName: "",
    access: {
      status: false,
      allRights: false,
      salesHead: false,
      numberHide: false,
      clickToCall: false,
      exportPermission: false,
      customSms: false,
      mailBox: false,
      chat: false,
      invoice: false,
      dashboard: false,
      backDateSO: false,
      popupDisabled: false,
    },
    // Other fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser((prevState) => ({
      ...prevState,
      access: {
        ...prevState.access,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    // Add API call or data processing logic here
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5">
        Add Users
      </h2>
      <BackButton />
      <div className="formWrapper bg-white p-2 rounded border border-2 border-gray mt-3 ">
        <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
          Add Users
        </h4>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Employee Code</label>
            <input
              type="text"
              name="employeeCode"
              value={user.employeeCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Father's Name</label>
            <input
              type="text"
              name="employeeCode"
              value={user.employeeCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mothers's Name</label>
            <input
              type="text"
              name="employeeCode"
              value={user.employeeCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Target</label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Reporting To:</label>
            <select>
              <option value="">Person 1</option>
              <option value="">Person 2</option>
            </select>
          </div>
          <div>
            <label>Access</label>
            {Object.keys(user.access).map((key) => (
              <div key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={user.access[key]}
                  onChange={handleCheckboxChange}
                />
                <label>{key}</label>
              </div>
            ))}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
