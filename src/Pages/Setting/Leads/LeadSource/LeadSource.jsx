import React, { useEffect, useState } from "react";
import { DeleteButton } from "../../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { EditButton } from "../../../../Components/Button/EditButton/EditButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeadSourceThunk, postLeadSourceThunk } from "../../../../Redux/Services/thunks/LeadSourceThunk";


const LeadSource = () => {
  const [leadSource, setLeadSource] = useState([]);
  const [newLeadSource, setNewLeadSource] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.leadsource);


  useEffect(() => {
    dispatch(getAllLeadSourceThunk());
  }, [dispatch]);

  
  useEffect(() => {
    if (data?.data) {
      setLeadSource(data.data);
    }
  }, [data]);

  const handleAddLeadSource = () => {
    if (newLeadSource.trim() !== "" && !leadSource.includes(newLeadSource.trim())) {
      const newAddLeadSource = {
        leadSourceValue: newLeadSource,
      };

      dispatch(postLeadSourceThunk(newAddLeadSource)).then((response) => {
        setMsg(response?.payload?.message || "Source added successfully");
        setLeadSource([...leadSource, newLeadSource.trim()]);
        setNewLeadSource("");
      });
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Lead Source
      </h2>
      <BackButton />
      <div className="lead-status-container mt-2">
        <div className="addLeadscontainer add-status p-2 mb-2">
          <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
            Add New Pool
          </h4>
          <input
            type="text"
            value={newLeadSource}
            onChange={(e) => setNewLeadSource(e.target.value)}
            placeholder="Pool Name"
          />
          <button onClick={handleAddLeadSource} className="btn btn-primary mt-2">
            Create
          </button>
          <p className="mt-3 text-success">{msg}</p>
        </div>

        <div className="bg-white p-4 rounded border border-4 border-gray">
          <h5>View Pools</h5>
          <div className=" mb-4 ">
            <PrintButton />
            <PdfButton />
            <CsvButton />
            <CopyButton />
          </div>
          <table id="table-data" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Pool Name</th>
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
              ) : leadSource.length > 0 ? (
                leadSource.map((leadSourceObj, index) => (
                  <tr key={leadSourceObj.id || index}>
                    <td>{leadSourceObj.leadSourceValue}</td>{" "}
                    
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <EditButton />
                        <DeleteButton />
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

export default LeadSource;
