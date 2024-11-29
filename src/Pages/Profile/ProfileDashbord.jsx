import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const ProfileDashbord = () => {

  
  return (
    <>
      <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
        View Profile
      </h2>
      <div className="container-fluid border border-2 border-gray mt-0 w-75 py-3" >
      <div className="container mt-0" style={{width:"100%"}} >
        <div className="row">
          {/* Personal Details Section */}
          <div className="col-md-6">
            <div className=" rounded p-3 mb-1" style={{background:"rgb(227,227,227)" , border :"2px solid grey" , height:"100%" }}>
              <h5 className="fw-bold text-dark mb-3 border-bottom pb-2">Personal Details</h5>
              <form>
                {[
                  { label: "Full Name", placeholder: "Admin" },
                  { label: "Father's Name", placeholder: "Father's Name" },
                  { label: "Mother's Name", placeholder: "Mother's Name" },
                  { label: "Personal Email", placeholder: "Personal Email", type: "email" },
                  { label: "Mobile Number", placeholder: "8871865000" },
                  { label: "Emergency Number", placeholder: "Emergency Number" },
                  { label: "Local Address", placeholder: "Local Address" },
                  { label: "Permanent Address", placeholder: "Permanent Address" },
                  { label: "DOB", placeholder: "01 Jan 2016" },
                ].map(({ label, placeholder, type = "text" }, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label>{label}</label>
                    <input type={type} className="form-control" placeholder={placeholder} />
                  </div>
                ))}
                <div className="form-group mb-3">
                  <label>Theme</label>
                  <select className="form-control">
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                </div>
              </form>
            </div>
          </div>

          {/* Official Details Section */}
          <div className="col-md-6">
            <div className=" rounded px-3 mb-1" style={{background:"rgb(227,227,227)" , border :"2px solid grey" , height:"100%" }}>
              <h5 className="fw-bold text-dark mt-3 mb-1 border-bottom pb-2">Official Details</h5>
              <form>
                {[
                  { label: "Reporting To", placeholder: "Fresh Pool" },
                  { label: "Department", placeholder: "Department" },
                  { label: "Role", placeholder: "Role" },
                  { label: "Target", placeholder: "2000000" },
                  { label: "DOJ", placeholder: "18 Apr 2016" },
                  { label: "Qualification", placeholder: "Qualification" },
                  { label: "PAN No", placeholder: "Pan No" },
                  { label: "Aadhar No", placeholder: "Aadhar No" },
                  { label: "Extension", placeholder: "Extension" },
                  { label: "Bank Name", placeholder: "Bank Name" },
                  { label: "IFSC", placeholder: "IFSC" },
                  { label: "Account Number", placeholder: "Account Number" },
                ].map(({ label, placeholder }, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label>{label}</label>
                    <input type="text" className="form-control" placeholder={placeholder} />
                  </div>
                ))}
               <div className="d-flex justify-content-end">
               <button type="submit" className="btn btn-primary">
                  Update
                </button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProfileDashbord;
