import React, { useEffect, useState } from "react";
// import "./AddUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  putUserThunk,
} from "../../../../Redux/Services/thunks/UserThunk";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { getAllDepartmentThunk } from "../../../../Redux/Services/thunks/DepartmentThunk";
import { getAllGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { getAllQualificationThunk } from "../../../../Redux/Services/thunks/QualificationThunk";
import { getAllEmpCodeNameThunk, getUserByIdThunk } from "../../../../Redux/Services/thunks/AdditionalApiThunk";

const EditUser = () => {
  // window.scrollTo(0, 0);
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({});
  const { state } = useLocation();
  const paymentData = state?.user;
  const userId = state?.user.id;
  console.log(userId)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [qualification, setQualification] = useState([]);
  const [options, setOptions] = useState([]);
  const { data, loading, error } = useSelector((state) => state.additional);
  const { emplist, loading: emplistLoad, error: emplistErr } = useSelector((state) => state.additional);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);




  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllEmpCodeNameThunk());
      console.log("API called after delay");
    }, 1000); // Delay of 2 seconds
  }, [dispatch,]);


  useEffect(() => {
    dispatch(getUserByIdThunk(userId));
    console.log("data-----------------", data);
  }, [dispatch, userId]);

  useEffect(() => {
    if (emplist && Array.isArray(emplist.data)) {
      console.log("Data received:", emplist);
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



  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (showAlert) {
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dateOfBirth" || name === "dateOfJoining") {
      const date = new Date(value);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
  
      setUser((prevUser) => ({
        ...prevUser,
        [name]: formattedDate,
      }));
    } else if (name === "mobileNumber") {
      // Allow only digits, max 10 characters

      if (/^\d{0,10}$/.test(trimmedValue)) {
        setUser((prevUser) => ({
          ...prevUser,
          [name]: trimmedValue,
        }));
      }
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value, 
      }));
    }
  };
  

  // const handleReportingChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === "dateOfBirth" || name === "dateOfJoining") {
  //     // Format the date to dd/mm/yyyy
  //     const date = new Date(value);
  //     const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
  //       date.getMonth() + 1
  //     )
  //       .toString()
  //       .padStart(2, "0")}/${date.getFullYear()}`;

  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       [name]: formattedDate,
  //     }));
  //   } else {
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       [name]: value,
  //     }));
  //   }
  // };


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

  useEffect(() => {
    if (data.data) {
      setUser({
        id: data.data.id,
        fullName: data.data.fullName,
        employeeCode: data.data.employeeCode,
        fathersName: data.data.fathersName,
        mothersName: data.data.mothersName,
        mobileNumber: data.data.mobileNumber,
        userName: data.data.userName,
        password: data.data.password,
        target: data.data.target,
        teamTarget: data.data.teamTarget,
        departmentName: data.data.departmentName?.toString() || "",
        designationName: data.data.groupName,
        groupName: data.data.groupName,
        reportingTo: data.data.reportingTo,
        qualificationName: data.data.qualificationName,
        extension: {
          callingExt: data.data.extension?.callingExt,
        },
        didNumber: data.data.didNumber,
        segmentAccess: [data.data.segmentAccess?.toString()],
        poolAccess: [data.data.poolAccess?.toString()],
        groupAccess: [data.data.groupAccess?.toString()],
        vendorAccess: [data.data.vendorAccess?.toString()],
        exceptVendorAccess: [data.data.exceptVendorAccess?.toString()],
        customFetch: [data.data.customFetch?.toString()],
        customFetchRatio: data.data.customFetchRatio,
        otpNumber: data.data.otpNumber,
        dateOfBirth: data.data.dateOfBirth,
        dateOfJoining: data.data.dateOfJoining,
        branch: data.data.branch,
        panNumber: data.data.panNumber,
        aadharNumber: data.data.aadharNumber,
        localAddress: data.data.localAddress,
        permanentAddress: data.data.permanentAddress,
        esslID: data.data.esslID,
        GroupId: data.data.groupid,
        bankDetails: {
          bankName: data.data.bankDetails?.bankName,
          ifsc: data.data.bankDetails?.ifsc,
          accountNumber: data.data.bankDetails?.accountNumber,
        },
        chatGroup: [data.data.chatGroup?.toString()],
        access: {
          status: data.data.access?.status,
          allRights: data.data.access?.allRights,
          salesHead: data.data.access?.salesHead,
          numberHide: data.data.access?.numberHide,
          clickToCall: data.data.access?.clickToCall,
          exportPermission: data.data.access?.exportPermission,
          customSms: data.data.access?.customSms,
          mailBox: data.data.access?.mailBox,
          chat: data.data.access?.chat,
          invoice: data.data.access?.invoice,
          dashboard: data.data.access?.dashboard,
          backDateSO: data.data.access?.backDateSO,
          popupDisabled: data.data.access?.popupDisabled,
        },
        emailId: data.data.emailId
      });

    }
  }, [data]);

  // ! <----------------------------Update Butoon--------------------------------------->
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);
    const AddNewUser = {
      id: user.id,
      employeeCode: user.employeeCode,
      FullName: user.fullName,
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
        callingExt:
          typeof user.extension !== 'object' && user.extension?.toString()
            ? user.extension.toString()
            : (typeof data.data.extension?.callingExt !== 'object' && data.data.extension?.callingExt?.toString())
              ? data.data.extension.callingExt.toString()
              : undefined,

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
      fetchedLeads: [
        {
          fetchedDate: null,
          totalFetchedLeads: 0,
        },
      ],
      access: { ...user.access },
      emailId: user.emailId
    };
    // ! <----------------------------Api Fetch--------------------------------------->
    dispatch(putUserThunk(AddNewUser))
      .then((response) => {
        console.log("User Updated successfully:", response);
        setIsSuccess(true);
        setIsError(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setIsError(true);
        setIsSuccess(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };


  dispatch(putUserThunk(AddNewUser))
    .then((response) => {
      if (response?.payload?.success) {
        console.log("User Updated successfully:", response);
        alert(response.payload.message || "User updated successfully!"); 
        setIsSuccess(true);
        setIsError(false);
      } else {
        alert(response.payload.message || "Something went wrong while updating!");
        setIsError(true);
        setIsSuccess(false);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      alert(error.response?.data?.message || "Failed to update user. Please try again.");
      setIsError(true);
      setIsSuccess(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  





  //!<-------------------------------------------------------------------------------VIEW DEPARTMENT----------------------------------------------------------------------------------------------------------->

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllDepartmentThunk()).unwrap();

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
          borderBottom: "1px solid #E1E4EF",
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
            padding: "18px 14px",
            fontSize: "30px",
            color: "#2D2D2D",
          }}
        >
          <FaUserPlus
            className="fs-1"
            style={{ marginRight: "8px", color: "#009488" }}
          />
          Users
        </h2>
      </section>

      <div className="mt-1">
        <div className="border border-2 border-grey">
          <h5
            className="text-dark border border-1 pb-2"
            style={{
              // padding: "18px 14px",
              fontSize: "1.7 rem",
              backgroundColor: "#E8F1F3",
            }}
          >
            <BackButton />
            Edit Users
          </h5>
          <div className="formWrapper p-2">
            <div>
              {showAlert && (
                <Alert variant="info" className="mt-2 text-center">
                  User Updated Successfully
                </Alert>
              )}
              {isError && (
                <Alert variant="danger" className="mt-2 text-center">
                  Failed to update user. Please try again.
                </Alert>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-3"> {/* Bootstrap grid row with gap (g-3) */}
                {/* Full Name */}
                <div className="col-12 col-md-4">
                  <label>Full Name</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Date of Birth */}
                <div className="col-12 col-md-4">
                  <label>Date Of Birth</label>
                  <input
                    className="form-control input-box"
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Father's Name */}
                <div className="col-12 col-md-4">
                  <label>Father's Name</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="fatherName"
                    value={user.fathersName}
                    onChange={handleChange}
                  />
                </div>

                {/* Mother's Name */}
                <div className="col-12 col-md-4">
                  <label>Mother's Name</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="motherName"
                    value={user.mothersName}
                    onChange={handleChange}
                  />
                </div>

                {/* Mobile Number */}
                <div className="col-12 col-md-4">
                  <label>Mobile Number</label>
                  <input
                    className="form-control input-box"
                    type="number"
                    name="mobileNumber"
                    value={user.mobileNumber}
                    onChange={handleChange}
                  />
                </div>


                <div className="col-12 col-md-4">
                  <label>Mail Box ID</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="emailId"
                    value={user.emailId}
                    onChange={handleChange}
                  />
                </div>

                {/* User Name */}
                <div className="col-12 col-md-4">
                  <label>User Name</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="col-12 col-md-4">
                  <label>Password</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Target */}
                <div className="col-12 col-md-4">
                  <label>Target</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="target"
                    value={user.target}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label>Team Target</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="teamTarget"
                    value={user.teamTarget}
                    onChange={handleChange}
                  />
                </div>

                {/* Reporting Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Reporting:</label>
                  <select
                    name="reportingTo"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.reportingTo || ""}
                  >
                    <option value="" disabled>--Select Reporting Person--</option>
                    {options.map((option) => (
                      <option key={option} value={option.employeeCode}>
                        {option.employeeName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Group Name Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Group Name:</label>
                  <select
                    name="groupName"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.groupName || ""}
                  >
                    <option value="" disabled>--Select Group Name--</option>
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

                {/* Department Dropdown */}
                {/* <div className="col-12 col-md-4">
                  <label>Department Name:</label>
                  <select
                    name="departmentName"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.departmentName || ""}
                  >
                    <option value="" disabled>
                      {isLoading ? "Loading..." : "--Select Department--"}
                    </option>
                    {Array.isArray(departments) &&
                      departments.map((dept) => (
                        <option key={dept.id} value={dept.departmentName}>
                          {dept.departmentName}
                        </option>
                      ))}
                  </select>
                </div> */}


                <div className="col-12 col-md-4">
                  <label>Department Name:</label>
                  <select
                    name="departmentName"
                    onChange={handleChange}
                    className="form-select input-box"
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



                {/* Designation Name */}
                <div className="col-12 col-md-4">
                  <label>Designation Name:</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="designationName"
                    value={user.designationName}
                    onChange={handleChange}
                  />
                </div>

                {/* Qualification Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Qualification Name:</label>
                  <select
                    name="qualificationName"
                    onChange={handleChange}
                    className="form-select input-box"
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

                {/* Segment Access Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Segment Access:</label>
                  <select
                    name="segmentAccess"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.segmentAccess || ""}
                  >
                    <option value="" disabled>--Select Segment Access</option>
                    <option value="Index Option">Index Option</option>
                    <option value="Index Future">Index Future</option>
                    <option value="Stock Option">Stock Option</option>
                    <option value="Stock Future">Stock Future</option>
                    <option value="Stock Cash">Stock Cash</option>
                  </select>
                </div>

                {/* Pool Access Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Pool Access:</label>
                  <select
                    name="poolAccess"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.poolAccess || ""}
                  >
                    <option value="" disabled>--Select pool access--</option>
                    <option value="Additional Pool">Additional Pool</option>
                    <option value="Fresh Pool">Fresh Pool</option>
                    <option value="Diamond Pool">Diamond Pool</option>
                    <option value="HNI Pool">HNI Pool</option>
                    <option value="Dispose Pool">Dispose Pool</option>
                  </select>
                </div>

                {/* Group Access Dropdown */}
                {/* <div className="col-12 col-md-4">
                  <label>Group Access:</label>
                  <select
                    name="groupAccess"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.groupAccess || ""}
                  >
                    <option value="" disabled>--Select Group Access--</option>
                    <option value="HR">ADMIN</option>
                    <option value="HR">HR</option>
                    <option value="BA">BA</option>
                    <option value="SBA">SBA</option>
                    <option value="ARM">ARM</option>
                    <option value="Manager">Manager</option>
                    <option value="DSH">DSH</option>
                  </select>
                </div> */}
                <div className="col-12 col-md-4">
                  <label>Group Access:</label>
                  <select
                    name="groupAccess"
                    onChange={handleChange}
                    className="form-select input-box"
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
                {/* Branch Dropdown */}
                <div className="col-12 col-md-4">
                  <label>Branch:</label>
                  {/* <select
                    name="branch"
                    onChange={handleChange}
                    className="form-select input-box"
                    value={user.branch || ""}
                  >
                    <option value="" disabled>--Select Branch--</option>
                    <option value="kotakmahendraidfc">kotakmahendraidfc</option>
                    <option value="idfc">idfc</option>
                  </select> */}

                  <input type="text"
                    className="form-control input-box"
                    name="branch"
                    value={user.branch || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Custom Fetch Ratio */}
                <div className="col-12 col-md-4">
                  <label>Custom Fetch Ratio</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="customFetchRatio"
                    value={user.customFetchRatio}
                    onChange={handleChange}
                  />
                </div>

                {/* Extension */}
                <div className="col-12 col-md-4">
                  <label>Extension</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="extension"
                    value={user.extension?.callingExt}
                    onChange={handleChange}
                  // pattern="[0-9]{1,5}"
                  />
                </div>

                {/* DID Number */}
                <div className="col-12 col-md-4">
                  <label>DID Number</label>
                  <input
                    className="form-control input-box"
                    type="number"
                    name="didNumber"
                    value={user.didNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Date of Joining */}
                <div className="col-12 col-md-4">
                  <label>Date Of Joining</label>
                  <input
                    className="form-control input-box"
                    type="date"
                    name="dateOfJoining"
                    value={user.dateOfJoining}
                    onChange={handleChange}
                  />
                </div>

                {/* Pan Number */}
                <div className="col-12 col-md-4">
                  <label>Pan Number</label>
                  <input
                    className="form-control input-box"
                    style={{ textTransform: "uppercase" }}
                    type="text"
                    name="panNumber"
                    value={user.panNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Aadhar Number */}
                <div className="col-12 col-md-4">
                  <label>Aadhar Number</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="aadharNumber"
                    value={user.aadharNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Local Address */}
                <div className="col-12 col-md-4">
                  <label>Local Address</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="localAddress"
                    value={user.localAddress}
                    onChange={handleChange}
                  />
                </div>

                {/* Permanent Address */}
                <div className="col-12 col-md-4">
                  <label>Permanent Address</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="permanentAddress"
                    value={user.permanentAddress}
                    onChange={handleChange}
                  />
                </div>

                {/* Bank Name */}
                <div className="col-12 col-md-4">
                  <label>Bank Name</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="bankName"
                    value={user.bankDetails?.bankName}
                    onChange={handleChange}
                  />
                </div>

                {/* IFSC */}
                <div className="col-12 col-md-4">
                  <label>IFSC</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="IFSC"
                    value={user.bankDetails?.ifsc}
                    onChange={handleChange}
                  />
                </div>

                {/* Account Number */}
                <div className="col-12 col-md-4">
                  <label>Account Number</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="accountNumber"
                    value={user.bankDetails?.accountNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Essl ID */}
                <div className="col-12 col-md-4">
                  <label>Essl ID</label>
                  <input
                    className="form-control input-box"
                    type="text"
                    name="esslID"
                    value={user.esslID}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Access Checkboxes */}
              <label className="mt-3">Access:</label>
              <div className="d-flex flex-wrap gap-3 border rounded p-3 bg-white mb-3">
                {user.access &&
                  Object.keys(user.access).map((key) => (
                    <div className="form-check" key={key}>
                      <input
                        type="checkbox"
                        name={key}
                        checked={user.access[key]}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label className="form-check-label">{key}</label>
                    </div>
                  ))}
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button
                  className="btn text-white px-4 py-2"
                  type="submit"
                  style={{ backgroundColor: "#009488" }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
