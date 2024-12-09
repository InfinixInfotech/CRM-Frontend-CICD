import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import { deleteDepartmentThunk, getAllDepartmentThunk, getByIdDepartmentThunk, postDepartmentThunk, putDepartmentThunk } from "../../../Redux/Services/thunks/DepartmentThunk";
import { useDispatch, useSelector } from "react-redux";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [editDepartment, setEditDepartment] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(getAllDepartmentThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      setAddDepartment(data.data);
    }
  }, [data]);

  // Add a new status
  // const handleAddDepartment = async () => {
  //   console.log("status");

  //   if (newDept.trim() !== "" && !addDepartment.includes(newDept.trim())) {
  //     // FormData could be replaced with an object if no files are involved
  //     // const formData = new FormData();
  //     // formData.append("departmentName", newDept);
  //     const addNewDept = { departmentName: newDept.trim() };

  //     try {
  //         const response = await dispatch(postDepartmentThunk(addNewDept)).unwrap();
          
  //         const message = response?.message || "Added successfully";
  //         setMsg(message);
  
  //         setAddDepartment((prevDepartments) => [
  //             ...prevDepartments,
  //             newDept.trim(),
  //         ]);
  //         setNewDept("");
  //     } catch (error) {
  //         const errorMsg = error?.message || "Permission denied";
  //         setMsg(errorMsg);
  //     }     
  //   } else {
  //     setMsg("Invalid or duplicate department");
  //   }
  // };

  const handleAddDepartment = () => {
    if (
      newDept.trim() !== "" &&
      !addDepartment.includes(newDept.trim())
    ) {
      const newAddDept = {
        departmentName: newDept,
      };

      dispatch(postDepartmentThunk(newAddDept)).then((response) => {
        setMsg(response?.payload?.message || "added successfully");
        setAddDepartment([...addDepartment, newAddDept.trim()]);
        setNewDept("");
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
    if (window.confirm("Are you sure you want to delete this status?")) {
      dispatch(deleteDepartmentThunk(id))
        .unwrap()
        .then((response) => {
          setMsg(response.message || "deleted successfully");
        })
        .catch((error) => {
          setMsg(error || "Failed to delete status");
        });
    }
  };

  const fetchDepartmentById = (id) => {
    dispatch(getByIdDepartmentThunk(id)).then((response) => {
      const leadSourceValue = response.payload?.data;
      setEditStatus(leadSourceValue?.id);
      setEditValue(leadSourceValue?.status);
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

            <input
              type="text"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              placeholder="Department Name"
            />
            <button
              onClick={handleAddDepartment}
              className="btn btn-primary"
            >
              Create
            </button>
          </div>

          <div className="bg-white p-4 rounded border border-4 border-gray">
            <h5>View Department</h5>
            <div className=" mb-4 ">
              <PrintButton />
              <PdfButton />
              <CsvButton />
              <CopyButton />
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
                {addDepartment.map((departObj, index) => (
                  <tr key={index}>
                    <td>{departObj.departmentName}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-2 ">
                        <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                        <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 " />
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

export default Department;
