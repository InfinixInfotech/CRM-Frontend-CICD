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
import { staticToken } from "../../../Redux/Services/apiServer/ApiServer";
import ExportData from "../../../Components/Button/DataButton/ExportButton";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDepartment, setEditDepartment] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.department);
  //!----------------------------------------------------------------------------------------------<---Pagination Logic------------->------------------------------------------------------
  const totalPages = Math.ceil(addDepartment.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStatuses = addDepartment.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  //!----------------------------------------------------------------------------------------------<-------RELOADE DATA --------->------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllDepartmentThunk());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  //!----------------------------------------------------------------------------------------------<---SET DATA FROM API ------------->------------------------------------------------------

  useEffect(() => {
    if (data?.data) {
      const timer = setTimeout(() => {
        setAddDepartment(data.data);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [data]);

  //!----------------------------------------------------------------------------------------------<---MSG TIME OUT------------->------------------------------------------------------

  useEffect(() => {
    if (msg) {
      const alertTimer = setTimeout(() => {
        setMsg("");
      }, 3000); // Alert will disappear after 3 seconds
      return () => clearTimeout(alertTimer);
    }
  }, [msg]);

  //!----------------------------------------------------------------------------------------------<---INSERT FUNCTIONALITY------------->------------------------------------------------------

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

  //!----------------------------------------------------------------------------------------------<---EDIT FUNCTIONALITY------------->------------------------------------------------------

  const handleEditDepartment = async (id) => {
    if (editValue.trim() !== "") {
      try {
        const token = staticToken; // Replace with your token retrieval logic
        const response = await fetch(`/api/Department/UpdateDepartmentAsync`, {
          method: "POST", // Ensure this matches your API requirement
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding the token
          },
          body: JSON.stringify({ id, departmentName: editValue }),
        });

        if (!response.ok) {
          throw new Error("Failed to update department");
        }

        const data = await response.json();
        setMsg(data?.message || "Department updated successfully");

        setAddDepartment((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept.id === id ? { ...dept, departmentName: editValue } : dept
          )
        );
        setEditDepartment(null);
        setEditValue("");
      } catch (error) {
        setMsg(error.message || "Failed to update department");
      }
    }
  };

  //!----------------------------------------------------------------------------------------------<------DELETE FUNCTIONALITY------->------------------------------------------------------

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

            {/* //!----------------------------------------------------------------------DESIGNATION_FORM_HANDLE------------------------------------------------------ */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editDepartment !== null) {
                  handleEditDepartment(editDepartment);
                } else {
                  handleAddDepartment(e);
                }
              }}
            >
              <input
                type="text"
                value={editDepartment !== null ? editValue : newDept}
                onChange={(e) =>
                  editDepartment !== null
                    ? setEditValue(e.target.value)
                    : setNewDept(e.target.value)
                }
                placeholder="Enter Department Name"
              />
              <button
                type="submit"
                className={`btn px-3 py-1 ${
                  editDepartment !== null ? "btn-warning" : "btn-primary"
                }`}
              >
                {editDepartment !== null ? "Update" : "Create"}
              </button>
            </form>
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Department</h5>
            <div className=" mb-4 ">
              {/* <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton /> */}
              <ExportData tableId="table-data" />

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
                ) : currentStatuses.length > 0 ? (
                  currentStatuses.map((addDepartmentObj) => (
                    <tr key={addDepartmentObj.id}>
                      <td>
                        {/* {editDepartment === addDepartmentObj.id ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : ( */}
                        {addDepartmentObj.departmentName}
                        {/* )} */}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <EditButton
                            className="btn btn-primary btn-sm mr-1 py-0 px-2"
                            onClick={() => {
                              setEditDepartment(addDepartmentObj.id);
                              setEditValue(addDepartmentObj.departmentName);
                            }}
                          />

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
            {/* //!<---------------------------------------------------------------------------------Pagination BUTTON----------------------------------------------------------------------> */}
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                <i className="bi bi-arrow-left-circle"></i>
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                  >
                    {number}
                  </button>
                )
              )}
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                <i className="bi bi-arrow-right-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
