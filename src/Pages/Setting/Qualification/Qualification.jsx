import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { useDispatch, useSelector } from "react-redux";
import { postQualificationThunk } from "../../../Redux/Services/thunks/QualificationThunk";



const Qualification = () => {
  const [qualification, setQualification] = useState([]);
  const [newQualification, setNewQualification] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.qualification);

  useEffect(() => {
    if (data && data.data) {
      setQualification(data.data);
    } else {
      console.warn("API Data is null or undefined.");
    }
  }, [data]);

  // Add a new status 
  const handleAddQualification = () => {
    if (
      newQualification.trim() !== "" &&
      !qualification.includes(newQualification.trim())
    ) {
      const newAddQualification = {
        qualificationName: newQualification,
      };

      dispatch(postQualificationThunk(newAddQualification)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setQualification([...qualification, newQualification.trim()]);
        setNewQualification("");
      });
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Qualification
      </h2>
      <BackButton />
      <div className="lead-status-container mt-2">
        <div className="addLeadscontainer add-status p-2 mb-2">
          <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
            Add New Qualification
          </h4>
          <input
            type="text"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
            placeholder="Qualification Name"
          />
          <button
            onClick={handleAddQualification}
            className="btn btn-primary mt-2"
          >
            Create
          </button>
          <p className="mt-3 text-success">{msg}</p>
        </div>

        <div className="bg-white p-4 rounded border border-4 border-gray">
          <h5>View Qualification</h5>
          <div className=" mb-4 ">
            <PrintButton />
            <PdfButton />
            <CsvButton />
            <CopyButton />
          </div>
          <table id="table-data" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Qualification Name</th>
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
              ) :qualification.length > 0 ? (
                qualification.map((QualificationObj, index) => (
                  <tr key={index}>
                    <td>{QualificationObj.qualificationName}</td>{" "}
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
                  <td colSpan="2">No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Qualification;
