import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import DeleteButton from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import {
  deleteDepartmentThunk,
  getAllDepartmentThunk,
  getByIdDepartmentThunk,
  postDepartmentThunk,
  putDepartmentThunk,
} from "../../../Redux/Services/thunks/DepartmentThunk";
import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { Alert } from "react-bootstrap";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDepartment, setEditDepartment] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.department);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllDepartmentThunk());
      setIsLoading(false);
    };  
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setAddDepartment(data.data);
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

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDept.trim() !== "" && !addDepartment.includes(newDept.trim())) {
      const newAddDept = {
        departmentName: newDept,
      };

      dispatch(postDepartmentThunk(newAddDept)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setNewDept("");
        setAddDepartment([...addDepartment, newAddDept]);
      });
    }
  };

  const handleEditDepartment = (id) => {
    if (editValue.trim() !== "") {
      dispatch(putDepartmentThunk({ id, departmentName: editValue })).then(
        (response) => {
          setMsg(response?.payload?.message || "updated successfully");
          dispatch(getAllDepartmentThunk());
          setEditDepartment(null);
          setEditValue("");
        }
      );
    }
  };

  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartmentThunk(id))
      .unwrap()
      .then((response) => {
        setMsg(response.message || "deleted successfully");
        setAddDepartment((prevStatuses) =>
          prevStatuses.filter((status) => status.id !== id)
        );
      })
      .catch((error) => {
        setMsg(error || "Failed to delete status");
      });
  };

  const fetchDepartmentById = (id) => {
    dispatch(getByIdDepartmentThunk(id)).then((response) => {
      const department = response.payload?.data;
      setEditStatus(department?.id);
      setEditValue(department?.department);
    });
  };

  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        Department
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
          <div className="addLeadscontainer add-status p-2 mb-2">
            <h4 className="p-0 text-dark ">Add New Department</h4>

            <form onSubmit={handleAddDepartment}>
              <input
                type="text"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                placeholder="Department Name"
              />
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Department</h5>
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
            <table
              id="table-data"
              className="table table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
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
                ) : addDepartment.length > 0 ? (
                  addDepartment.map((addDepartmentObj) => (
                    <tr key={addDepartmentObj.id}>
                      <td>
                        {editDepartment === addDepartmentObj.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          addDepartmentObj.departmentName
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          {editDepartment === addDepartmentObj.id ? (
                            <button
                              onClick={() =>
                                handleEditDepartment(addDepartmentObj.id)
                              }
                              className="btn btn-success"
                            >
                              Save
                            </button>
                          ) : (
                            <EditButton
                              className="btn btn-primary btn-sm mr-1 py-0 px-2"
                              onClick={() =>
                                fetchDepartmentById(addDepartmentObj.id)
                              }
                            />
                          )}
                          <DeleteButton
                            className="btn btn-danger btn-sm mr-1 py-0 px-2"
                            onDelete={() =>
                              handleDeleteDepartment(addDepartmentObj.id)
                            }
                          />
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
      </div>
    </>
  );
};

export default Department;
