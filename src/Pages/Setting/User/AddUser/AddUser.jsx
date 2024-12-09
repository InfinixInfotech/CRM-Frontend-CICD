import React, { useEffect, useState } from "react";
import "./AddUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { postUserThunk } from "../../../../Redux/Services/thunks/UserThunk";

const AddUser = () => {
  const [user, setUser] = useState({
    fullName: "",
    employeeCode: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    userName: "",
    password: "",
    target: "0",
    groupid: "",
    departmentName: "",
    designationName: "",
    groupName: "",
    reportingTo: "",
    qualificationName: "",
    extension: "",
    didNumber: "",
    segmentAccess: "",
    poolAccess: "",
    groupAccess: "",
    vendorAccess: "",
    exceptVendorAccess: "",
    customFetch: "",
    customFetchRatio: "",
    otpNumber: "0",
    dateOfBirth: "2024-11-30T11:09:06.723Z",
    dateOfJoining: "2024-12-05T14:30:00Z",
    branch: "",
    panNumber: "",
    aadharNumber: "",
    localAddress: "",
    permanentAddress: "",
    bankName: "",
    bankDetails: "",
    IFSC: "",
    accountNumber: "",
    esslID: "",
    chatGroup: "",

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
  });

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.data) {
      console.log("API Data:", data.data);
      setUser(data.data);
    } else {
      console.log("API Data is null or undefined.");
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      // Ensure the value is parsed correctly as a Date object
      setUser((prevUser) => ({
        ...prevUser,
        [name]: new Date(value), // Convert string to Date object
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
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

    const AddNewUser = {
      fullName: user.fullName,
      employeeCode: user.employeeCode,
      FathersName: user.fatherName,
      MothersName: user.motherName,
      mobileNumber: user.mobileNumber,
      userName: user.userName,
      password: user.password,
      target: user.target,
      departmentName: user.departmentName,
      designationName: user.designationName,
      groupName: user.groupName,
      reportingTo: user.reportingTo,
      qualificationName: user.qualificationName,
      extension: {
        callingExt: user.extension,
      },
      didNumber: user.didNumber,
      segmentAccess: [user.segmentAccess?.toString()],
      poolAccess: [user.poolAccess?.toString()],
      groupAccess: [user.groupAccess?.toString()],
      vendorAccess: [user.vendorAccess?.toString()],
      exceptVendorAccess: [user.exceptVendorAccess?.toString()],
      customFetch: [user.customFetch?.toString()],
      customFetchRatio: user.customFetchRatio,
      otpNumber: user.otpNumber,
      dateOfBirth: user.dateOfBirth,
      dateOfJoining: user.dateOfJoining,
      branch: user.branch,
      panNumber: user.panNumber,
      aadharNumber: user.aadharNumber,
      localAddress: user.localAddress,
      permanentAddress: user.permanentAddress,
      esslID: user.esslID,
      GroupId: user.groupid,
      BankDetails: {
        bankName: user.bankName,
        ifsc: user.IFSC,
        accountNumber: user.accountNumber,
      },
      chatGroup: [user.chatGroup?.toString()],
      access: { ...user.access }, // Spread all access fields
    };

    // Make the API call using dispatch
    dispatch(postUserThunk(AddNewUser))
      .then((response) => {
        console.log("User added successfully:", response);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5">
        Add Users
      </h2>
      <BackButton />
      <div className="container-fluid border border-2 border-gray mt-1 pb-3">
        <div className="formWrapper p-2 rounded mt-3 p-4 ">
          <form className="addUser-form" onSubmit={handleSubmit}>
            <div>
              <label>Full Name</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Employee Code</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="employeeCode"
                value={user.employeeCode}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Father's Name</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="fatherName"
                value={user.fatherName}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Mothers's Name</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="motherName"
                value={user.motherName}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                className="ps-2 inputField"
                type="number"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>User Name</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="ps-2 inputField"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Target</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="target"
                value={user.target}
                onChange={handleChange}
                //required
              />
            </div>

            <div className="dropdown">
              <label>Reporting To:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Group Name:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Department Name:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Designation Name:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Qualification Name:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Segment Access:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Pool Access:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Group Access:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Custom Fetch:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Branch:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>
            <div className="dropdown">
              <label>Chat Group:</label>
              <select className="inputField">
                <option value="">Person 1</option>
                <option value="">Person 2</option>
              </select>
            </div>

            <div>
              <label>Custom Fetch Ratio</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="customFetchRatio"
                value={user.customFetchRatio}
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Extension</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="extension"
                value={user.extension}
                onChange={handleChange}
                pattern="[0-9]{1,5}"
                //required
              />
            </div>
            <div>
              <label>DID Number</label>
              <input
                className="ps-2 inputField"
                type="number"
                name="didNumber"
                value={user.didNumber}
                // placeholder="DID Number ."
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Vendor Access</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="vendorAccess"
                value={user.vendorAccess}
                // placeholder="DID Number ."
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Except Vendor Access</label>
              <input
                className="ps-2 inputField inputField"
                type="text"
                name="exceptVendorAccess"
                value={user.exceptVendorAccess}
                // placeholder="DID Number ."
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>OTP Number</label>
              <input
                className="ps-2 inputField inputField"
                type="number"
                name="otpNumber"
                value={user.otpNumber}
                // placeholder="0 for no otp"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <input
                className="ps-2 inputField inputField"
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                // placeholder="Date of birth"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Date Of Joining</label>
              <input
                className="ps-2 inputField inputField"
                type="date"
                name="dateOfJoining"
                value={user.dateOfJoining}
                // placeholder="Date of joining"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Pan Number</label>
              <input
                className="ps-2 inputField"
                style={{ textTransform: "uppercase" }}
                type="text"
                name="panNumber"
                value={user.panNumber}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Aadhar Number</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="aadharNumber"
                value={user.aadharNumber}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Local Address</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="localAddress"
                value={user.localAddress}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Permanent Address</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="permanentAddress"
                value={user.permanentAddress}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Bank Name</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="bankName"
                value={user.bankName}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>IFSC</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="IFSC"
                value={user.IFSC}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Account Number</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="accountNumber"
                value={user.accountNumber}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>
            <div>
              <label>Essl ID</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="esslID"
                value={user.esslID}
                // placeholder="PAN NUMBER"
                onChange={handleChange}
                //required
              />
            </div>

            <div className="AdduserCheckboxes">
              <label>Access:</label>
              {user.access &&
                Object.keys(user.access).length > 0 &&
                Object.keys(user.access).map((key) => (
                  <div className="d-flex gap-1" key={key}>
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
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary " type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
