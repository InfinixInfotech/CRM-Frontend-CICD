import React, { useEffect, useState } from "react";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";

import { putGroupsThunk , deleteGroupsThunk, getAllGroupsThunk, getByIdGroupsThunk } from "../../../../Redux/Services/thunks/GroupsThunk";
import { useDispatch, useSelector } from "react-redux";

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
  const [editgroups, setEditGroups] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  
  
  const { data, loading, error } = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getAllGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log("helloooooooo "+data.data);
    
    if (data?.data) {
      setGroupsData(data.data);
    }
  }, [data]);

  const handleEditGroups = (id) => {
    if (editValue.trim() !== "") {
      dispatch(putLeadStatusThunk({ id, status: editValue })).then(
        (response) => {
          setMsg(response?.payload?.message || "Status updated successfully");
          dispatch(getAllLeadStatusThunk());
          setEditStatus(null);
          setEditValue("");
        }
      );
    }
  };

  const handleDeleteGroups = (id) => {
    if (window.confirm("Are you sure you want to delete this status?")) {
      dispatch(deleteLeadStatusThunk(id))
        .unwrap()
        .then((response) => {
          setMsg(response.message || "Status deleted successfully");
        })
        .catch((error) => {
          setMsg(error || "Failed to delete status");
        });
    }
  };

  const fetchGroupsById = (id) => {
    dispatch(getByIdLeadStatusThunk(id)).then((response) => {
      const status = response.payload?.data;
      setEditStatus(status?.id);
      setEditValue(status?.status);
    });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Groups
      </h2>
      <BackButton />
      <div  className="container-fluid border border-2 border-gray mt-2 ">
        <div style={{ background: "rgb(227,227,227)" , margin:"15px 5px 15px 5px" , paddingBottom:"15px" , border:"2px solid gray"}} >
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
                  <th className="text-center">Lead Limit</th>
                  <th className="text-center">Fetch Limit</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                // groupsData.map((group, index) => (
                //   <tr key={index}>
                //     <td>{group.groupName}</td>
                //     <td>{group.userCount}</td>
                //     <td>{group.leadLimit}</td>
                //     <td>{group.fetchLimit}</td>
                //     <td className="text-center">
                //       <div className="d-flex justify-content-center align-items-center gap-2">
                //         <EditButton className="px-2 py-0"/>
                //         <DeleteButton className="px-2 py-0" />
                //       </div>
                //     </td>
                //   </tr>
                // ))
                groupsData.map((groupObj) => (
                  <tr key={groupObj.id}>
                    <td>
                      {editgroups === groupObj.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        groupObj.groupName || "N/A"
                      )}
                    </td>
                    <td>
                      {editgroups === groupObj.id ? (
                        <input
                          type="number"
                          value={editValue}  // You can assign specific value for each field
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        groupObj.groupId || "N/A"
                      )}
                    </td>
                    <td>
                      {editgroups === groupObj.id ? (
                        <input
                          type="number"
                          value={editValue}  // You can assign specific value for each field
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        groupObj.fetchLimit || "N/A"
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        {editgroups === groupObj.id ? (
                          <button
                            onClick={() => handleEditGroups(groupObj.id)}
                            className="btn btn-success btn-sm"
                          >
                            Save
                          </button>
                        ) : (
                          <EditButton
                            className="btn btn-primary btn-sm mr-1 py-0 px-2"
                            onClick={() => setEditGroups(groupObj.id)}
                          />
                        )}
                        <DeleteButton
                          className="btn btn-danger btn-sm mr-1 py-0 px-2"
                          onClick={() => handleDeleteGroups(groupObj.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewGroups;
