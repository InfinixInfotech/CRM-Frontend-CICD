import React, { useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import {
  CreateDesignationThunk,
  deleteDesignationThunk,
  fetchByIdDesignationThunk,
  GetAllDesignationThunk,
  UpdateDesignationThunk,
} from "../../../Redux/Services/thunks/DesignationThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";

const Designation = () => {
  const [designation, setDesignation] = useState([]);
  const [newDesignation, setNewDesignation] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [msg, setMsg] = useState("");
  const { data, loading, error } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetAllDesignationThunk());   
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setDesignation(data.data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  useEffect(() => {
    if (msg) {
      const alertTimer = setTimeout(() => {
        setMsg("");
      }, 3000); // Alert will disappear after 3 seconds
      return () => clearTimeout(alertTimer);
    }
  }, [msg]);

  const handleAddTarget = () => {
    if (newTarget.trim() !== "" && !designation.includes(newTarget.trim())) {
      const newaddDesignation = {
        designationName: newDesignation,
        designationTarget: newTarget,
      };
      dispatch(CreateDesignationThunk(newaddDesignation)).then(() => {
        setDesignation([...designation, newaddDesignation]);
        setNewTarget("");
        setNewDesignation("");
      });
    }
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Designation
      </h2>
      <BackButton />
      <div
        className="container-fluid border border-2 border-gray mt-2 py-3"
        style={{ padding: "18px 16px" }}
      >
        <div
          className="lead-status-container mt-0 p-3"
          style={{ background: "rgb(227,227,227)", border: "2px solid grey" }}
        >
          {/* Add New Status */}
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className=" p-0 mb-2 text-dark ">Add New Designation</h4>

            <div className="d-flex mt-3">
              <input
                type="text"
                value={newDesignation}
                onChange={(e) => setNewDesignation(e.target.value)}
                placeholder="Designation Name"
              />

              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Designation Target"
              />

              <button onClick={handleAddTarget} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Designation</h5>
            <div className=" mb-4 ">
              <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton />

              {msg && (
                <Alert variant="info" className="mt-2 text-center">
                  {msg}
                </Alert>
              )}
            </div>
            <tbody>
              {loading ? (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(104, 102, 102, 0.5)",
                    zIndex: 9998,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 9999,
                      backgroundColor: "transparent",
                    }}
                  >
                    <HashLoader color="#0060f1" size={50} />
                  </div>
                </div>
              ) : error ? (
                <tr>
                  <td colSpan="2" className="text-center text-danger">
                    Error: {error}
                  </td>
                </tr>
              ) : designation.length > 0 ? (
                designation.map((designationObj, index) => (
                  <tr key={index}>
                    <td>{designationObj.designationName}</td>
                    <td>{designationObj.designationTarget}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                        <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 " />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Designation;
