import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";
import ExportData from "../../../Components/Button/DataButton/ExportButton";
import { getAllPaidClientsThunk } from "../../../Redux/Services/thunks/PaidClientsThunk";
import { useDispatch, useSelector } from "react-redux";
import { emp } from "../../../Redux/Services/apiServer/ApiServer";

const PaidClients = () => {
  const employeeCode = emp;
  const [paidClientData, setPaidClientData] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.paidclients);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllPaidClientsThunk(employeeCode));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setPaidClientData(Array.isArray(data.data) ? data.data : [data.data]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);
  console.log("paidClientData---------------", paidClientData);

  return (
    <div className="mt-5">
      <section
        style={{
          position: "relative",
          // padding: "12px 30px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #E1E6EF",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          marginBottom: "0px", // Uncomment and fix if needed
          marginBottom: "5px", // Uncomment and fix if needed
        }}
        className="mt-2"
      >
        <h2
          className="mb-0 mt-5 mb-2"
          style={{
            padding: "18px 16px",
            fontSize: "30px",
            color: "#2D2D2D",
            // backgroundColor: "#E3E3E3",
          }}
        >
          <FaCheckCircle
            className="fs-1"
            style={{ marginRight: "8px", color: "#009688" }}
          />
          Paid Clients
        </h2>
      </section>
      <div className="border border-2 border-gray mt-2">
        <h5
          className="text-dark border border-1 pb-2"
          style={{
            // padding: "18px 16px",
            fontSize: "1.7 rem",
            backgroundColor: "#E8F1F3",
          }}
        >
          <BackButton />
          View Clients
        </h5>
        <div className="">
          <div className="lead-status-container ">
            <div className="bg-white p-2">
              <ExportData tableId="table-data" />

              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
                style={{ fontSize: "14px" }}
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Lead Id</th>
                    <th>Mobile Number</th>
                    <th>Client Name</th>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    <th>Reporting To</th>
                    <th>Group Name</th>
                    <th>SO Id</th>
                    <th>Create Date</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>SO Status</th>
                    <th>Grand Total</th>
                    <th>Comment</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paidClientData.map((clientData) => (
                    clientData.paymentHistory.map((history, index) => (
                      <tr key={`${clientData.id}-${index}`}>
                        <td>{clientData.id}</td>
                        <td>{clientData.leadId}</td>
                        <td>{clientData.mobileNumber}</td>
                        <td>{clientData.clientName}</td>
                        <td>{history.employeeCode}</td>
                        <td>{history.employeeName}</td>
                        <td>{history.reportingTo}</td>
                        <td>{history.groupName}</td>
                        <td>{history.soId}</td>
                        <td>{history.createDate}</td>
                        <td>{history.startDate}</td>
                        <td>{history.endDate}</td>
                        <td>{history.soStatus}</td>
                        <td>{history.grandTotal}</td>
                        <td>{history.comment}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidClients