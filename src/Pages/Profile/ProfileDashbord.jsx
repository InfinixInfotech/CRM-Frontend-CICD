import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { persnolDetailsThunk } from "../../Redux/Services/thunks/AdditionalApiThunk";
import { emp } from "../../Redux/Services/apiServer/ApiServer";
import { FaCreditCard } from "react-icons/fa";
import { User } from "lucide-react";
const PersonalDetails = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.additional);
  const empcode = emp;
  // Local state to store fetched data
  const [personalData, setPersonalData] = useState({});

  console.log(personalData)

  useEffect(() => {
    dispatch(persnolDetailsThunk(empcode));
  }, [dispatch]);


  useEffect(() => {
    if (data?.data) {
      setPersonalData(data.data);
    } else {
      console.error("No valid data found", data);
    }
  }, [data]);


  return (
    <>

    <section
            style={{
              // position: "relative",
              // z-index: 1;
              zIndex:"1",
              // padding: "12px 30px",
              background: "#2c3e50",
    
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
                color: "white",
                // backgroundColor: "#E3E3E3",
              }}
            >
              <User 
                className="fs-1"
                style={{ marginRight: "8px", color: "white" }}
              />
         Persnol Details
            </h2>
          </section>

      <div className="row">
        {/* Personal Details Section */}
        <div className="col-md-6">
          <div className="rounded p-3 mb-1" style={{ background: "white", border: "2px solid grey", height: "100%" }}>
            <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Personal Details</h5>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">Error loading data</p>
            ) : (
              <form>
                {[
                  { label: "Full Name", value: personalData.fullName },
                  { label: "Father's Name", value: personalData.fathersName },
                  { label: "Mother's Name", value: personalData.mothersName },
                  { label: "Mobile Number", value: personalData.mobileNumber },
                  { label: "Mail Box Id", value: personalData.emailId },
                  { label: "Local Address", value: personalData.localAddress },
                  { label: "Permanent Address", value: personalData.permanentAddress },
                  { label: "DOB", value: personalData.dateOfBirth },
                ].map(({ label, value }, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label>{label}</label>
                    <input type="text" className="form-control input-box" value={value}  />
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>

        {/* Official Details Section */}
        <div className="col-md-6">
          <div className="rounded px-3 mb-1" style={{ background: "white", border: "2px solid grey", height: "100%" }}>
            <h5 className="fw-bold text-dark mt-3 mb-1 border-bottom pb-2">Official Details</h5>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">Error loading data</p>
            ) : (
              <form>
                {[
                  { label: "Reporting To", value: personalData?.reportingTo },
                  { label: "Department", value: personalData?.departmentName },
                  { label: "Role", value: personalData?.designationName },
                  { label: "Target", value: personalData?.target },
                  { label: "DOJ", value: personalData.dateOfJoining },
                  { label: "PAN No", value: personalData?.panNumber },
                  { label: "Aadhar No", value: personalData.aadharNumber },
                  { label: "Extension", value: personalData.extension?.callingExt },
                  { label: "Bank Name", value: personalData.bankDetails?.bankName },
                  { label: "IFSC", value: personalData.bankDetails?.ifsc },
                  { label: "Account Number", value: personalData.bankDetails?.accountNumber },
                ].map(({ label, value }, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label>{label}</label>
                    <input type="text" className="form-control input-box" value={value}  />
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
