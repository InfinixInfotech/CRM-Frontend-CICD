import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { SendButton } from "../../../Components/Button/SendButton/SendButton";
import { DisposeButton } from "../../../Components/Button/DisposeButton/DisposeButton";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { StatusButton } from "../../../Components/Button/StatusButton/StatusButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import { PRButton } from "../../../Components/Button/PRButton/PRButton";

const PaidClients = () => {
  const [paidClientData, setPaidClientData] = useState([
    {
      Id: 1,
      ClientName: "priyanshu",
      Mobile: "9340770705",
      AssignedTo: "INFHARSH21158",
      LeadSource: "Gold",
      SO: "salesOrder",
      Description: "discription",
    },
    {
      Id: 1,
      ClientName: "priyanshu",
      Mobile: "9340770705",
      AssignedTo: "INFHARSH21158",
      LeadSource: "Gold",
      SO: "salesOrder",
      Description: "discription",
    },
    {
      Id: 1,
      ClientName: "priyanshu",
      Mobile: "9340770705",
      AssignedTo: "INFHARSH21158",
      LeadSource: "Gold",
      SO: "salesOrder",
      Description: "discription",
    },
  ]);
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
              {/* {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )} */}

              <table
                id="table-data"
                className="table table-bordered table-striped mt-2"
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Client Name</th>
                    <th>Mobile</th>
                    <th>Assigned To</th>
                    <th>Lead Source</th>
                    <th>SO</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paidClientData.map((clientData) => (
                    <tr key={clientData.Id}>
                      <td>{clientData.Id}</td>
                      <td>{clientData.ClientName}</td>
                      <td>{clientData.Mobile}</td>
                      <td>{clientData.AssignedTo}</td>
                      <td>{clientData.LeadSource}</td>
                      <td>{clientData.SO}</td>
                      <td>{clientData.Description}</td>
                      <td>
                        <div className="btn-group d-grid gap-2 d-sm-flex">
                          <StatusButton />
                          <EditButton />
                          <DeleteButton />
                          <DisposeButton />
                          <PRButton />
                          <SendButton />
                        </div>
                      </td>
                    </tr>
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

export default PaidClients;
