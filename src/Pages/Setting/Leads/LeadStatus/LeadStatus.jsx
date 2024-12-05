import React, { useEffect, useState } from "react";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import "./LeadStatus.css";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLeadStatusThunk,
  postLeadStatusThunk,
  deleteLeadStatusThunk,
  putLeadStatusThunk,
  getByIdLeadStatusThunk,
} from "../../../../Redux/Services/thunks/LeadStatusThunk";

const LeadStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [editStatus, setEditStatus] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.leadstatus);

  // Fetch all statuses on component mount
  useEffect(() => {
    dispatch(getAllLeadStatusThunk());
  }, [dispatch]);

  // Update statuses when data changes
  useEffect(() => {
    if (data?.data) {
      setStatuses(data.data);
    }
  }, [data]);

  // Add new lead status
  const handleAddStatus = () => {
    if (newStatus.trim() !== "" && !statuses.some((s) => s.status === newStatus.trim())) {
      const newLeadStatus = { status: newStatus };

      dispatch(postLeadStatusThunk(newLeadStatus)).then((response) => {
        setMsg(response?.payload?.message || "Status added successfully");
        dispatch(getAllLeadStatusThunk());
        setNewStatus("");
      });
    }
  };

  // Edit lead status
  const handleEditStatus = (id) => {
    dispatch(putLeadStatusThunk({ id, status: editValue })).then((response) => {
      setMsg(response?.payload?.message || "Status updated successfully");
      dispatch(getAllLeadStatusThunk());
      setEditStatus(null);
      setEditValue("");
    });
  };

  // Delete lead status
  const handleDeleteStatus = (id) => {
    dispatch(deleteLeadStatusThunk(id)).then((response) => {
      setMsg(response?.payload?.message || "Status deleted successfully");
      dispatch(getAllLeadStatusThunk());
    });
  };

  // Fetch lead status by ID (for edit or display purposes)
  const fetchStatusById = (id) => {
    dispatch(getByIdLeadStatusThunk(id)).then((response) => {
      const status = response.payload?.data;
      setEditStatus(status?.id);
      setEditValue(status?.status);
    });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Leads Status
      </h2>
      <BackButton />
      <div className="lead-status-container mt-2">
        {/* Add New Lead Status */}
        <div className="addLeadscontainer add-status p-2 mb-2">
          <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
            Add New Lead Status
          </h4>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Enter Lead Status"
          />
          <button onClick={handleAddStatus} className="btn btn-primary mt-2">
            Create
          </button>
          <p className="mt-3 text-success">{msg}</p>
        </div>

        {/* View Lead Status */}
        <div className="bg-white p-4 rounded border border-4 border-gray">
          <h5>View Lead Status</h5>
          <div className="mb-4">
            <PrintButton />
            <PdfButton />
            <CsvButton />
            <CopyButton />
          </div>
          <table id="table-data" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Lead Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="2" className="text-center text-danger">
                    Error: {error}
                  </td>
                </tr>
              ) : statuses.length > 0 ? (
                statuses.map((statusObj) => (
                  <tr key={statusObj.id}>
                    <td>
                      {editStatus === statusObj.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                        />
                      ) : (
                        statusObj.status
                      )}
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        {editStatus === statusObj.id ? (
                          <button
                            onClick={() => handleEditStatus(statusObj.id)}
                            className="btn btn-success"
                          >
                            Save
                          </button>
                        ) : (
                          <EditButton
                            onClick={() => fetchStatusById(statusObj.id)}
                          />
                        )}
                        <DeleteButton
                          onClick={() => handleDeleteStatus(statusObj.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No statuses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeadStatus;
