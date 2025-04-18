import React, { useEffect, useState } from "react";
import "./AddUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { postUserThunk } from "../../../../Redux/Services/thunks/UserThunk";
import { Alert } from "react-bootstrap";
import { getAllDepartmentThunk } from "../../../../Redux/Services/thunks/DepartmentThunk";
import { getAllGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { getAllQualificationThunk } from "../../../../Redux/Services/thunks/QualificationThunk";
import { emp } from "../../../../Redux/Services/apiServer/ApiServer";
import { FaUserPlus } from "react-icons/fa";
import { getAllEmpCodeNameThunk } from "../../../../Redux/Services/thunks/AdditionalApiThunk";

const AddUser = () => {
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [options, setOptions] = useState([]);
  const [allEmployeeCodes, setAllEmployeeCodes] = useState([]);
  const { emplist, loading, error } = useSelector((state) => state.additional);

  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
    // console.log("data-----------------", emplist);
  }, [dispatch]);


  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      // console.log("Data received:", data);
      // Transform the array into dropdown options
      const transformedOptions = emplist.data.map((item) => ({
        id: item.employeeCode,  // Unique key
        employeeCode: item.employeeCode,
        employeeName: item.employeeName,
        label: `${item.employeeCode} - ${item.employeeName}`,
      }));

      setOptions(transformedOptions);
    } else {
      console.log("Invalid data format or no data available.");
    }
  }, [emplist]);

  const [user, setUser] = useState({
    fullName: "",
    employeeCode: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    userName: "",
    password: "",
    target: 0,
    teamTarget: 0,
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
    otpNumber: 0,
    dateOfBirth: "",
    dateOfJoining: "",
    branch: "",
    panNumber: "",
    aadharNumber: "",
    localAddress: " ",
    permanentAddress: "",
    bankName: "",
    bankDetails: " ",
    IFSC: "",
    accountNumber: "",
    esslID: "",
    chatGroup: "",
    fetchedLeads: [
      {
        fetchedDate: null,
        totalFetchedLeads: 0,
      },
    ],
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
    emailId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, 
    }));
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
    setShowAlert(true);

    const AddNewUser = {
      fullName: user.fullName,
      employeeCode: user.employeeCode,
      FathersName: user.fatherName,
      MothersName: user.motherName,
      mobileNumber: user.mobileNumber,
      userName: user.userName,
      password: user.password,
      target: user.target,
      teamTarget: user.teamTarget,
      departmentName: user.departmentName ? user.departmentName.toString() : "",
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
      dateOfBirth: user.dateOfBirth || 0,
      dateOfJoining: user.dateOfJoining || 0,
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
      fetchedLeads: [
        {
          fetchedDate: user.fetchedLeads.fetchedDate,
          totalFetchedLeads: user.fetchedLeads.totalFetchedLeads,
        },
      ],
      access: { ...user.access },
    };

    //!<-------------------------------------------------------------------------------ADD USER----------------------------------------------------------------------------------------------------------->

    dispatch(postUserThunk(AddNewUser))
    .then((response) => {
      if (response?.payload?.success) {
        alert(response.payload.message || "User added successfully!");
      } else {
        alert(response.payload.message || "Something went wrong!");
      }
    })
    .catch((error) => {
      alert(error.response?.data?.message || "Failed to add user. Please try again.");
    })};

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //!<-------------------------------------------------------------------------------VIEW DEPARTMENT----------------------------------------------------------------------------------------------------------->

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllDepartmentThunk()).unwrap();
        // console.log("API Response: ", response);

        if (response.success && Array.isArray(response.data)) {
          setDepartments(response.data);
        } else {
          console.error("Invalid response format: ", response);
          setDepartments([]);
        }
      } catch (error) {
        console.error("Error fetching departments: ", error);
        setDepartments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);



  //!<-------------------------------------------------------------------------------VIEW GROUPS----------------------------------------------------------------------------------------------------------->

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await dispatch(getAllGroupsThunk()).unwrap();
        console.log("API Response: ", response);

        if (response.success && Array.isArray(response.data)) {
          setGroupsData(response.data);
        } else {
          console.error("Invalid response format: ", response);
          setGroupsData([]);
        }
      } catch (error) {
        console.error("Error fetching GroupsData: ", error);
        setGroupsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [dispatch]);

  //!<-------------------------------------------------------------------------------QUALIFICATION----------------------------------------------------------------------------------------------------------->

  useEffect(() => {
    const fetchQualificationData = async () => {
      try {
        const response = await dispatch(getAllQualificationThunk()).unwrap();
        console.log("API Response: ", response);

        if (response.success && Array.isArray(response.data)) {
          setQualification(response.data);
        } else {
          console.error("Invalid response format: ", response);
          setQualification([]);
        }
      } catch (error) {
        console.error("Error fetching Qualification: ", error);
        setQualification([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQualificationData();
  }, [dispatch]);







  return (
    <>
      <section
        style={{
          position: "relative",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px",
          marginBottom: "5px",
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
          }}
        >
          <FaUserPlus
            className="fs-1"
            style={{ marginRight: "8px", color: "#2c3e50" }}
          />
          Users
        </h2>
      </section>

      <div className="mt-1">
        <div className="border border-2 border-grey">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 16px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton />
            Add Users
          </h5>
          <div className="formWrapper p-2">
            {/* <div>
              {showAlert && (
                <Alert variant="info" className="mt-2 text-center">
                  User Added Successfully
                </Alert>
              )}
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="formContentWrapper addUser-form">
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
                  <label>Date Of Birth</label>
                  <input
                    className="ps-2 inputField inputField"
                    type="date"
                    name="dateOfBirth"
                    value={
                      user.dateOfBirth
                      // ? user.dateOfBirth.split("/").reverse().join("-")
                      // : ""
                    } // Convert dd/mm/yyyy to yyyy-mm-dd for the input field
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label>Date Of Joining</label>
                  <input
                    className="ps-2 inputField inputField"
                    type="date"
                    name="dateOfJoining"
                    value={
                      user.dateOfJoining
                      // ? user.dateOfJoining.split("/").reverse().join("-")
                      // : ""
                    } // placeholder="Date of joining"
                    onChange={handleChange}
                  //required
                  />
                </div>

                {/* 
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
                </div> */}

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
                    type="text" 
                    name="mobileNumber"
                    value={user.mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value; 
                      if (/^\d{0,10}$/.test(value)) {
                        handleChange({ target: { name: "mobileNumber", value } });
                      }
                    }}
                    maxLength={10} 
                    required
                  />
                </div>

                <div>
                  <label>Mail Box Id</label>
                  <input
                    className="ps-2 inputField"
                    type="text"
                    name="emailId"
                    value={user.emailId}
                    onChange={handleChange}
                  //required
                  />
                </div>

                {/* <div>
                  <label>User Name</label>
                  <input
                    className="ps-2 inputField"
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                  //required
                  />
                </div> */}

                <div>
                  <label>Password</label>
                  <input
                    className="ps-2 inputField"
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
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
                  // required
                  />
                </div>
                <div>
                  <label>Team Target</label>
                  <input
                    className="ps-2 inputField"
                    type="text"
                    name="teamTarget"
                    value={user.teamTarget}
                    onChange={handleChange}
                  // required
                  />
                </div>


                <div className="dropdown">
                  <label>Reporting:</label>
                  <select
                    name="reportingTo"
                    onChange={handleChange}
                    className="inputField"
                    value={user.reportingTo || ""}
                  >
                    <option value="" disabled>
                      --Select Reporting Person--
                    </option>
                    {options.map((option) => (
                      <option key={option.id} value={option.employeeCode}>
                        {option.employeeName}
                      </option>
                    ))}
                  </select>
                </div>


                {/* <div className="dropdown mt-2">
                  <label className="compose-label">Reporting</label>
                  <select className="inputField" multiple onChange={handleChange}>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div> */}


                {/* //!----------------------------------------------------------------------------------------GROUP NAME---------------------------------------------------------------------------------// */}
                <div className="dropdown">
                  <label>Group Name:</label>
                  <select
                    name="groupName"
                    onChange={handleChange}
                    className="inputField"
                    value={user.groupName || ""}
                  >
                    <option value="" disabled>
                      --Select Group Name--
                    </option>
                    {Array.isArray(groupsData) && groupsData.length > 0 ? (
                      groupsData.map((dept) => (
                        <option key={dept.id} value={dept.groupName}>
                          {dept.groupName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Groups Available</option>
                    )}
                  </select>
                </div>

                {/* //!----------------------------------------------------------------------------------------Department dropdown---------------------------------------------------------------------------------// */}

                <div className="dropdown">
                  <label>Department Name:</label>
                  <select
                    name="departmentName"
                    onChange={handleChange}
                    className="inputField"
                    value={user.departmentName || ""}
                  >
                    <option value="" disabled>
                      {isLoading ? "Loading..." : "--Select Department--"}
                    </option>
                    {Array.isArray(groupsData) &&
                      groupsData.map((dept) => (
                        <option key={dept.id} value={dept.groupName}>
                          {dept.groupName}
                        </option>
                      ))}
                  </select>
                </div>

                <div >
                  <label>Designation Name:</label>

                  <input type="text" name="designationName" value={user.designationName || ""} className=" ps-2 inputField" onChange={handleChange} />
                  {/* <select name="designationName" className="inputField"
                    onChange={handleChange}
                    value={user.designationName || ""}
                  >
                    <option value="" disabled>
                      --Select Group Name--
                    </option>
                    <option value="BDE">BDE</option>
                    <option value="SBDE">SBDE</option>
                    <option value="TL">TL</option>
                    <option value="PTL">PTL</option>
                    <option value="ARM">ARM</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="DSH">DSH</option>
                  </select> */}
                </div>

                {/* //!----------------------------------------------------------------------------------------Qualification dropdown---------------------------------------------------------------------------------// */}

                <div className="dropdown">
                  <label>Qualification Name:</label>
                  <select
                    name="qualificationName"
                    onChange={handleChange}
                    className="inputField"
                    value={user.qualificationName || ""}
                  >
                    <option value="" disabled>
                      {isLoading ? "Loading..." : "--Select Qualification--"}
                    </option>
                    {Array.isArray(qualification) &&
                      qualification.map((quali) => (
                        <option key={quali.id} value={quali.qualificationName}>
                          {quali.qualificationName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="dropdown">
                  <label>Segment Access:</label>
                  <select
                    name="segmentAccess"
                    onChange={handleChange}
                    className="inputField"
                    value={user.segmentAccess || ""}
                  >
                    <option value="" disabled>
                      --Select Segment Access
                    </option>
                    <option value="Index Option">Index Option</option>
                    <option value="Index Future">Index Future</option>
                    <option value="Stock Option">Stock Option</option>
                    <option value="Stock Future">Stock Future</option>
                    <option value="Stock Cash">Stock Cash</option>
                    {/* <option value="Algo Software Yearly">
                      Algo Software Yearly
                    </option> */}
                  </select>
                </div>
                <div className="dropdown">
                  <label>Pool Access:</label>
                  <select
                    name="poolAccess"
                    onChange={handleChange}
                    className="inputField"
                    value={user.poolAccess || ""}
                  >
                    {" "}
                    <option value="" disabled>
                      --Select pool access--
                    </option>
                    <option value="Additional Pool">Additional Pool</option>
                    <option value="Fresh Pool">Fresh Pool</option>
                    <option value="HNI Pool">HNI Pool</option>
                    <option value="Platinum Pool">Platinum Pool</option>
                    <option value="Diamond Pool">Diamond Pool </option>
                    <option value="Dispose Pool">Dispose Pool</option>
                  </select>
                </div>


                {/* <div className="dropdown">
                  <label>Group Access:</label>
                  <select
                    name="groupAccess"
                    onChange={handleChange}
                    className="inputField"
                    value={user.groupAccess || ""}
                  >
                    <option value="" disabled>
                      --Select Group Access--
                    </option>
                    <option value="HR">ADMIN</option>
                    <option value="HR">HR</option>
                    <option value="BA">BA</option>
                    <option value="SBA">SBA</option>
                    <option value="ARM">ARM</option>
                    <option value="Manager">Manager</option>
                    <option value="DSH">DSH</option>
                  </select>
                </div>*/}


                <div className="dropdown">
                  <label>Group Access:</label>
                  <select
                    name="groupAccess"
                    onChange={handleChange}
                    className="inputField"
                    value={user.groupAccess || ""}
                  >
                    <option value="" disabled>
                      --Select Group Access--
                    </option>
                    {Array.isArray(groupsData) && groupsData.length > 0 ? (
                      groupsData.map((dept) => (
                        <option key={dept.id} value={dept.groupName}>
                          {dept.groupName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Groups Available</option>
                    )}
                  </select>
                </div>

                {/* <div className="dropdown">
                  <label>Custom Fetch:</label>
                  <select
                    name="customFetch"
                    onChange={handleChange}
                    className="inputField"
                    value={user.customFetch || ""}
                  >
                    <option value="" disabled>
                      --Select Custom fetch--
                    </option>
                    <option value="Fresh Pool">Fresh Pool</option>
                    <option value="Diamond Pool">Diamond Pool</option>
                    <option value="Diamond Pool">Compaign Pool</option>
                    <option value="Diamond Pool">Dispose Pool</option>
                    <option value="Diamond Pool">Special Dates</option>
                  </select>
                </div> */}

                {/* <div className="dropdown">
                  <label>Branch:</label>
                  <select
                    name="branch"
                    onChange={handleChange}
                    className="inputField"
                    value={user.branch || ""}
                  >
                    {" "}
                    <option value="" disabled>
                      --Select Branch--
                    </option>
                    <option value="kotakmahendraidfc">kotakmahendraidfc</option>
                    <option value="idfc">idfc</option>
                  </select>
                </div> */}

                {/* <div className="dropdown">
                  <label>Chat Group:</label>
                  <select
                    name="chatGroup"
                    onChange={handleChange}
                    className="inputField"
                    value={user.chatGroup || ""}
                  >
                    <option value="" disabled>
                      --Select chatgroup--
                    </option>
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="Reasearch">Reasearch</option>
                  </select>
                </div> */}

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

                {/* <div>
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
                </div> */}

                {/* <div>
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
                </div> */}

                {/* <div>
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
                </div> */}



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
              </div>

              <label className="mt-2">Access:</label>
              <div
                className="AdduserCheckboxes border border-2 rounded p-2 bg-white mb-2"
              >
                {user.access &&
                  Object.keys(user.access).length > 0 &&
                  Object.keys(user.access).map((key) => (
                    <div className="d-flex gap-1 items-center" key={key}>
                      <input
                        type="checkbox"
                        name={key}
                        checked={user.access[key]}
                        onChange={handleCheckboxChange}
                        style={{ width: "18px", height: "18px" }} // Inline styles
                      />
                      <label className="text-sm">{key}</label>
                    </div>
                  ))}
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn text-white px-4 py-1" type="submit" style={{ backgroundColor: "#2c3e50" }}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
