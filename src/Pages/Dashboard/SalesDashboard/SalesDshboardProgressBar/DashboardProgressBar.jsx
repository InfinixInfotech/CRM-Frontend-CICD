import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { storedGroupName } from "../../../../Redux/Services/apiServer/ApiServer";
import { getAllSmsByEmpCodeThunk } from "../../../../Redux/Services/thunks/MailSmsThunk";

const DashboardProgressBar = () => {
  const dispatch = useDispatch();
  const [notices, setNotices] = useState([]);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [targetEmpData, setTargetEmpData] = useState({});
  const { data1, loading1, error1 } = useSelector(
    (state) => state.targetEmployeeCode
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getAllSmsByEmpCodeThunk());
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch]);




  useEffect(() => {
    if (data1?.data) {
      setTargetEmpData(data1?.data);
    }
  }, [data1]);

  // console.log("targetData-----------------" + targetEmpData)

  const { data, loading, error } = useSelector(
    (state) => state.allSmsByEmpCode
  );


  function htmlToText(html) {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  }

  useEffect(() => {
    if (data?.data) {
      const mappedNotices = data.data
        .map((msg) => {
          if (!msg.createDate) return null; // Skip if no date

          const dateParts = msg.createDate.split("-"); // Expected format: "DD-MM-YYYY"
          const day = dateParts[0] || "N/A";
          const monthIndex = parseInt(dateParts[1], 10) - 1; // Convert "01" to 0 (Jan)

          return {
            date: day, // Extract day
            month: monthNames[monthIndex] || "N/A", // Convert numeric month to name
            title: msg.subject || "No Subject",
            location: msg.message || "No message",
            status: "Email",
            bgColor: "#2c3e50",
          };
        })
        .filter(Boolean) // Remove null values if any
        .slice(0, 3); // Take only the first 3 notices

      setNotices(mappedNotices);
    }
  }, [data]);



  return (
    <div className="d-flex justify-content-center  gap-5">


      <div
        className="bg-white"
        style={{
          width: "50%",
          position: "relative",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "5px",
        }}
      >
        <h5
          className="text-white border border-1 text-center p-3"
          style={{
            fontSize: "1.7rem",
            background: "#2c3e50",

          }}
        >
          Notifications
        </h5>


        {notices.map((notice, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center ms-2 me-2 mt-2"
            style={{ borderBottom: "1px solid #d0cccc", padding: "8px 0" }}
          >
            <div className="d-flex align-items-center">
              <div
                className="text-center border border-gray-300 bg-light me-3"
                style={{
                  width: "42px",
                  height: "44px",
                  fontFamily: "Arial, sans-serif",
                  boxSizing: "border-box",
                }}
              >
                <span
                  className="d-block text-dark text-center  px-3"
                  style={{ fontSize: "14px", backgroundColor: "#F2F2F2" }}
                >
                  {notice.date}
                </span>
                <div style={{ borderTop: "1px solid #ccc" }} />
                <span
                  className="d-block text-white"
                  style={{ fontSize: "14px", backgroundColor: "#004d40" }}
                >
                  {notice.month}
                </span>
              </div>

              <div>
                <h6 className="mb-1" style={{fontSize:"14px"}}>{notice.title}</h6>
                <a href="https://mailbox.infinixinfotech.in/" style={{ color: "white", fontSize: "8px" }} target="_blank" rel="noopener noreferrer">
                  <span
                    className="text-muted"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      fontSize: "12px",
                      WebkitLineClamp: 2,
                      overflow: 'hidden'
                    }}
                  >
                    {htmlToText(notice.location)}
                  </span>


                </a>
              </div>


            </div>
            <div>
              <span
                className="px-2 ms-4 text-white"
                style={{
                  fontSize: "14px",
                  backgroundColor: "#004d40",
                  borderRadius: "5px",
                }}
              >
                {notice.status}
              </span>
            </div>
          </div>
        ))}
      </div>



      <div
        className="bg-white rounded-lg shadow-md "
        style={{
          width: "50%",
          position: "relative",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "5px",
         
        }}
      >
        <h5
          className="text-white border border-1 text-center p-2"
          style={{
            fontSize: "1.7rem",
            background: "#2c3e50",

          }}
        >
          Target Report
        </h5>

        <div className="rounded-lg px-2" style={{ borderBottom: "0px solid #d0cccc", backgroundColor: "white" }}>
          {/* Section for BDE and SBDE */}
          {["BDE", "SBDE"].includes(storedGroupName) && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6 className="mb-2">Target</h6>
                <span className="px-2 mb-2 d-inline-block text-dark rounded" style={{ fontSize: "16px" }}>
                  <strong>{targetEmpData.target}</strong>
                </span>
              </div>
              <div className="progress" style={{ height: "50px", backgroundColor: "#e9ecef", marginBottom: "24px" }}>
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%", backgroundColor: "#2c3e50" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title={`Target: ${targetEmpData.target}`}></div>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6 className="mb-2">Achieved Target</h6>
                <span className="px-2 mb-2 d-inline-block text-dark rounded" style={{ fontSize: "16px" }}>
                  <strong>{targetEmpData.grandTotal}</strong>
                </span>
              </div>
              <div className="progress" style={{ height: "50px", backgroundColor: "#e9ecef" }}>
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${(targetEmpData.grandTotal / targetEmpData.target) * 100}%`, backgroundColor: (targetEmpData.grandTotal / targetEmpData.target) * 100 < 30 ? "#dc3545" : (targetEmpData.grandTotal / targetEmpData.target) * 100 <= 70 ? "#ffc107" : "#28a745" }} aria-valuenow={(targetEmpData.grandTotal / targetEmpData.target) * 100} aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title={`Grand Total: ${targetEmpData.grandTotal} | Progress: ${((targetEmpData.grandTotal / targetEmpData.target) * 100).toFixed(2)}%`}></div>
              </div>
            </div>
          )}
        </div>

        <div className="px-2 py-4 rounded-lg" style={{ backgroundColor: "white", marginTop: "24px" }}>
          {/* Section for TL, Manager, Senior Manager, DSH */}
          {["TL", "Manager", "Senior Manager", "DSH"].includes(storedGroupName) && (
            <div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6 className="mb-2">Team Target</h6>
                <span className="px-2 mb-2 d-inline-block text-dark rounded" style={{ fontSize: "16px" }}>
                  <strong>{targetEmpData.teamTarget}</strong>
                </span>
              </div>
              <div className="progress" style={{ height: "50px", backgroundColor: "#e9ecef" }}>
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${(targetEmpData.teamTarget / targetEmpData.teamTarget) * 100}%`, backgroundColor: "#2c3e50" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title={`Team Target: ${targetEmpData.teamTarget}`}></div>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h6 className="mb-2">Achieved Target</h6>
                <span className="px-2 mb-2 d-inline-block text-dark rounded" style={{ fontSize: "16px" }}>
                  <strong>{targetEmpData.grandTotal}</strong>
                </span>
              </div>
              <div className="progress" style={{ height: "50px", backgroundColor: "#e9ecef" }}>
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${(targetEmpData.grandTotal / targetEmpData.teamTarget) * 100}%`, backgroundColor: (targetEmpData.grandTotal / targetEmpData.teamTarget) * 100 < 30 ? "#dc3545" : (targetEmpData.grandTotal / targetEmpData.teamTarget) * 100 <= 70 ? "#ffc107" : "#28a745" }} aria-valuenow={(targetEmpData.grandTotal / targetEmpData.teamTarget) * 100} aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-placement="top" title={`Grand Total: ${targetEmpData.grandTotal} | Progress: ${((targetEmpData.grandTotal / targetEmpData.teamTarget) * 100).toFixed(2)}%`}></div>
              </div>
            </div>
          )}
        </div>



      </div>




    </div>


  );
};

export default DashboardProgressBar;
