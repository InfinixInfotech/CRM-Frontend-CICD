import React from "react";
import "./AddLeads.css";

const AddLeads = () => { 
  return (
   <>
    <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-0">
    Add Leads
  </h2>
    <div className="container-fluid border border-2 border-gray mt-1 ">
      {/* Personal Details Section */}
      <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4" >
        <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-1 text-white tw-bold fs-5">Personal Details</div>
        <div >
          <div className="row g-3">
            <div className="col-md-4 ">
              <label className="form-label">Client Name</label>
              <input type="text" className="form-control" placeholder="Enter Client Name" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Assigned To</label>
              <select className="form-select">
                <option>Select Here...</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Lead Source</label>
              <input type="text" className="form-control" placeholder="Fresh Pool" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Mobile</label>
              <input type="text" className="form-control" placeholder="Enter Mobile Number" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Alternate Mobile</label>
              <input type="text" className="form-control" placeholder="Enter Alternate Mobile Number" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Other Mobile 1</label>
              <input type="text" className="form-control" placeholder="Client Other Mobile Number 1" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Other Mobile 2</label>
              <input type="text" className="form-control" placeholder="Client Other Mobile Number 2" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter Email ID" />
            </div>
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input type="text" className="form-control" placeholder="Enter City" />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <select className="form-select">
                <option>Select Here...</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">DOB</label>
              <input type="date" className="form-control" />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Details Section */}
      <div className="addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4" >
        <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">Investment Detail</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Investment</label>
              <select className="form-select">
                <option>Select Investment...</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Profile</label>
              <select className="form-select">
                <option>Select Profile...</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Trading</label>
              <select className="form-select">
                <option>Select Here...</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Trading Exp</label>
              <input type="text" className="form-control" placeholder="Enter Trading Exp" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Lot</label>
              <input type="text" className="form-control" placeholder="Enter Lot Size" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Annual Income</label>
              <select className="form-select">
                <option>Below 1 lac</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Investment Goal</label>
              <select className="form-select">
                <option>Capital Appreciation</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Market Value</label>
              <select className="form-select">
                <option>&lt; 1 lac</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Min. Investment</label>
              <select className="form-select">
                <option>&lt; 50000</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Source of Income</label>
              <select className="form-select">
                <option>Salary</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Pan No.</label>
              <input type="text" className="form-control" placeholder="Enter PAN No" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Unique Identity Number (UID)</label>
              <input type="text" className="form-control" placeholder="Enter Aadhaar Number" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Language</label>
              <select className="form-select">
                <option>--Select Here--</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Followup Details Section */}
      <div className=" addleadSections field-container mt-2 border me-0 ms-0 border-1 border-gray p-3 rounded   mb-4">
        <div className="card-header bg-secondary px-2 py-2 rounded text-black mb-2 text-white tw-bold fs-5">Followup Detail</div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Lead Status</label>
              <select className="form-select">
                <option>None</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Segment</label>
              <input type="text" className="form-control" placeholder="Select Some Options" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Free Trial Start Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Free Trial End Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Follow Up</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-8">
              <label className="form-label">Comment</label>
              <textarea className="form-control" rows="2" placeholder="Enter Comments"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default AddLeads;
