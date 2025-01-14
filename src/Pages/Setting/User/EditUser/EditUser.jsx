import React, { useEffect, useState } from "react";
// import "./AddUser.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { staticToken } from "../../../../Redux/Services/apiServer/ApiServer";
import {
  postUserThunk,
  putUserThunk,
} from "../../../../Redux/Services/thunks/UserThunk";
import { useDispatch } from "react-redux";

const EditUser = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState({});
  const { state } = useLocation();
  const paymentData = state?.user;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // console.log("editUser-----------------"+JSON.stringify(paymentData));
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth" || name === "dateOfJoining") {
      // Format the date to dd/mm/yyyy
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
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
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
    if (paymentData) {
      setUser({
        id: paymentData.id,
        fullName: paymentData.fullName,
        employeeCode: paymentData.employeeCode,
        FathersName: paymentData.fatherName,
        MothersName: paymentData.motherName,
        mobileNumber: paymentData.mobileNumber,
        userName: paymentData.userName,
        password: paymentData.password,
        target: paymentData.target,
        departmentName: paymentData.departmentName?.toString() || "",
        designationName: paymentData.designationName,
        groupName: paymentData.groupName,
        reportingTo: paymentData.reportingTo,
        qualificationName: paymentData.qualificationName,
        extension: {
          callingExt: paymentData.extension,
        },
        didNumber: paymentData.didNumber,
        segmentAccess: [paymentData.segmentAccess?.toString()],
        poolAccess: [paymentData.poolAccess?.toString()],
        groupAccess: [paymentData.groupAccess?.toString()],
        vendorAccess: [paymentData.vendorAccess?.toString()],
        exceptVendorAccess: [paymentData.exceptVendorAccess?.toString()],
        customFetch: [paymentData.customFetch?.toString()],
        customFetchRatio: paymentData.customFetchRatio,
        otpNumber: paymentData.otpNumber,
        dateOfBirth: paymentData.dateOfBirth,
        dateOfJoining: paymentData.dateOfJoining,
        branch: paymentData.branch,
        panNumber: paymentData.panNumber,
        aadharNumber: paymentData.aadharNumber,
        localAddress: paymentData.localAddress,
        permanentAddress: paymentData.permanentAddress,
        esslID: paymentData.esslID,
        GroupId: paymentData.groupid,
        BankDetails: {
          bankName: paymentData.bankName,
          ifsc: paymentData.IFSC,
          accountNumber: paymentData.accountNumber,
        },
        chatGroup: [paymentData.chatGroup?.toString()],
        access: { ...paymentData.access }, // Spread all access fields
      });
    }
  }, [paymentData]);

  // ! <----------------------------Update Butoon--------------------------------------->

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true); // Show the alert
    // Ensure the `id` exists in the user object
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
    };

    // ! <----------------------------Api Fetch--------------------------------------->

    // try {
    //   const token = staticToken;
    //   const response = await fetch(`/api/Users/UpdateUsersById?id=${user.id}&employeeCode=${user.employeeCode}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(AddNewUser),
    //   });

    //   if (!response.ok) throw new Error("Failed to update user.");
    //   // const updatedUser = await response.json();
    //   // setUser(updatedUser);
    //   alert("User updated successfully!");
    //   navigate("/viewuser", { state: { updated: AddNewUser } });

    // } catch (error) {
    //   console.error("Error updating user:", error);
    //   alert("Failed to update user.");
    // }

    dispatch(putUserThunk(AddNewUser))
      .then((response) => {
        console.log("User Updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updateing user:", error);
      });
  };

  // ! <----------------------------User Interface--------------------------------------->

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5">
        Edit Users
      </h2>
      <BackButton />
      <div className="container-fluid border border-2 border-gray mt-1 pb-3">
        <div className="formWrapper p-2 rounded mt-3 p-4 ">
          <div>
            {showAlert && (
              <Alert variant="info" className="mt-2 text-center">
                User Added Successfully
              </Alert>
            )}
          </div>
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
                // required
              />
            </div>

            <div className="dropdown">
              <label>Reporting To:</label>
              <select className="inputField">
                <option value="Person 1">Person 1</option>
                <option value="Person 2">Person 2</option>
              </select>
            </div>

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
                <option value="HR">HR</option>
                <option value="BA">BA</option>
                <option value="SBA">SBA</option>
                <option value="ARM">ARM</option>
                <option value="Manager">Manager</option>
                <option value="DSH">DSH</option>
              </select>
            </div>

            <div className="dropdown">
              <label>Department Name:</label>
              <select
                name="departmentName"
                onChange={handleChange}
                className="inputField"
                value={user.departmentName || ""}
              >
                <option value="" disabled>
                  --Select Department--
                </option>
                <option value="management">Management</option>
                <option value="sales">Sales</option>
              </select>
            </div>

            <div className="dropdown">
              <label>Designation Name:</label>
              <input
                className="ps-2 inputField"
                type="text"
                name="designationName"
                value={user.designationName}
                onChange={handleChange}
                //required
              />
            </div>
            <div className="dropdown">
              <label>Qualification Name:</label>
              <select
                name="qualificationName"
                onChange={handleChange}
                className="inputField"
                value={user.qualificationName || ""}
              >
                <option value="" disabled>
                  --Select Qualification--
                </option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
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
                <option value="Algo Software Monthely">
                  Algo Software Monthely
                </option>
                <option value="Algo Software Quaterly">
                  Algo Software Quaterly
                </option>
                <option value="Algo Software Half Yearly">
                  Algo Software Half Yearly
                </option>
                <option value="Algo Software Yearly">
                  Algo Software Yearly
                </option>
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
                <option value="Fresh Pool">Fresh Pool</option>
                <option value="Diamond Pool">Diamond Pool</option>
                <option value="HNI Pool">HNI Pool</option>
                <option value="Dispose Pool">Dispose Pool</option>
              </select>
            </div>
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
                <option value="HR">ADMIN</option>
                <option value="HR">HR</option>
                <option value="BA">BA</option>
                <option value="SBA">SBA</option>
                <option value="ARM">ARM</option>
                <option value="Manager">Manager</option>
                <option value="DSH">DSH</option>
              </select>
            </div>
            <div className="dropdown">
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
            </div>
            <div className="dropdown">
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
                <option value="">kotakmahendraidfc</option>
                <option value="idfc">idfc</option>
              </select>
            </div>
            <div className="dropdown">
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
                type="text"
                name="dateOfBirth"
                value={
                  user.dateOfBirth
                    ? user.dateOfBirth.split("/").reverse().join("-")
                    : ""
                } // Convert dd/mm/yyyy to yyyy-mm-dd for the input field
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date Of Joining</label>
              <input
                className="ps-2 inputField inputField"
                type="text"
                name="dateOfJoining"
                value={
                  user.dateOfBirth
                  // ? user.dateOfJoining.split("/").reverse().join("-")
                  // : ""
                } // placeholder="Date of joining"
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
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
