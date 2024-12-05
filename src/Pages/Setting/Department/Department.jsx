import React, { useEffect, useState } from "react";
import { EditButton } from "../../../Components/Button/EditButton/EditButton";
import { DeleteButton } from "../../../Components/Button/DeleteButton/DeleteButton";
import BackButton from "../../../Components/Button/BackButton/BackButton";
import { PrintButton } from "../../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
import {postDepartmentThunk} from "../../../Redux/Services/thunks/DepartmentThunk"
import { useDispatch, useSelector } from "react-redux";

const Department = () => {
  const [addDepartment, setAddDepartment] = useState([
    "HR",
    "Sales",
    "Operation",
    "Training",
  ]);
  const [newDept, setNewDept] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.department);

  useEffect(() => {
    if (data && data.data) {
      setQualification(data.data);
    } else {
      console.warn("API Data is null or undefined.");
    }
  }, [data]);

  // Add a new status
  const handleAddDepartment = () => {
    console.log("status");
    
    if (newDept.trim() !== "" && !addDepartment.includes(newDept.trim())) {
        
        // FormData could be replaced with an object if no files are involved
        const formData = new FormData();
        formData.append('departmentName', newDept);

        // Dispatch the action and update state once the response is received
        dispatch(postDepartmentThunk(formData)).then((response) => {
            const message = response?.payload?.message || "Added successfully";
            setMsg(message);
            
            // Use functional state update for addDepartment
            setAddDepartment(prevDepartments => [...prevDepartments, newDept.trim()]);
            setNewDept("");  // Reset the input field
        }).catch((error) => {
            // Handle error if needed
            setMsg("Error occurred while adding department");
        });
    } else {
        setMsg("Invalid or duplicate department");
    }
};


 
  return (
   <>
    <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">Department</h2>
    <BackButton/>
    <div className="lead-status-container mt-2">
      
      <div className="addLeadscontainer add-status p-2 mb-2">
        <h4 className="addLeadsinput border border-black p-2 mb-2 text-white ">
          Add New Department
        </h4>
        <input
          type="text"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="Department Name"
        />
        <button onClick={handleAddDepartment} className="btn btn-primary mt-2">
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
        <table id="table-data" className="table table-bordered table-striped">
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
                    <EditButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
};

export default Department;
