import React, { useState } from "react";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";

const ViewGroups = () => {
  const [groupsData, setGroupsData] = useState([
    { groupName: "All Rights", userCount: 4, leadLimit: 0, fetchLimit: 5 },
    { groupName: "User Group", userCount: 0, leadLimit: 0, fetchLimit: 0 },
    { groupName: "SBA", userCount: 50, leadLimit: 0, fetchLimit: 0 },
    { groupName: "BA", userCount: 157, leadLimit: 0, fetchLimit: 0 },
    { groupName: "TL", userCount: 22, leadLimit: 0, fetchLimit: 0 },
    { groupName: "Manager", userCount: 14, leadLimit: 0, fetchLimit: 0 },
    { groupName: "ARM", userCount: 8, leadLimit: 0, fetchLimit: 0 },
    { groupName: "Operation Team", userCount: 6, leadLimit: 0, fetchLimit: 0 },
    { groupName: "HR", userCount: 7, leadLimit: 0, fetchLimit: 0 },
    { groupName: "kyc", userCount: 1, leadLimit: 0, fetchLimit: 0 },
  ]);

  //

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Groups
      </h2>
      <BackButton />
      <div  className="container-fluid border border-2 border-gray mt-2 ">
        <div style={{ background: "rgb(227,227,227)" , margin:"12px" , paddingBottom:"15px"}} >
          <div className="container mt-1" >
            <div className="mb-2">
              <PrintButton tableId={"table-data"}/>
              <PdfButton tableId={"table-data"}/>
              <CsvButton tableId={"table-data"}/>
              <CopyButton tableId={"table-data"}/>
            </div>
            <table
              id="table-data"
              className="table table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th className="text-center">Group Name</th>
                  <th className="text-center">User Count</th>
                  <th className="text-center">Lead Limit</th>
                  <th className="text-center">Fetch Limit</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {groupsData.map((group, index) => (
                  <tr key={index}>
                    <td>{group.groupName}</td>
                    <td>{group.userCount}</td>
                    <td>{group.leadLimit}</td>
                    <td>{group.fetchLimit}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <EditButton className="px-2 py-0"/>
                        <DeleteButton className="px-2 py-0" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewGroups;
