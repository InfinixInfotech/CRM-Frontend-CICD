import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteButton } from "../../Components/Button/DeleteButton/DeleteButton";
import { EditButton } from "../../Components/Button/EditButton/EditButton";
import { PrintButton } from "../../Components/Button/DataButton/DataPrintButton/DataPrintButton";
import { CsvButton } from "../../Components/Button/DataButton/DataCsvButtton/DataCsvButton";
import { PdfButton } from "../../Components/Button/DataButton/DataPdfButton/DataPdfButton";
import { CopyButton } from "../../Components/Button/DataButton/DataCopyButton/DataCopyButton";
const Payment = () => {
  const [payments, setPayments] = useState([
    {
      leadId: 1928161,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Pradeep Kumar",
      mobile: "9430391604",
      leadOwner: "Vikas Choubey",
      manager: "Kundan Meena",
      panNo: "BQEPS9474F",
      segment: "Stock Option",
      bank: "Payment Gateway",
      total: 6500,
      remark: null,
      refId: null,
      email: "kpradeep47238@gmail.com",
      city: "Hazaribag",
      state: "Jharkhand",
      dob: "1984-06-05",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    {
      leadId: 1505649,
      paymentId: null,
      paymentDate: "28-11-2024",
      clientName: "Prabhakar Balagunde",
      mobile: "9060650055",
      leadOwner: "Rahul Lokahnde",
      manager: "Ashvini Godare",
      panNo: null,
      segment: "Stock Option",
      bank: "SBI Bank",
      total: 10000,
      remark: null,
      refId: null,
      email: null,
      city: "Gulbarga",
      state: "Karnataka",
      dob: "1985-06-15",
      status: "Pending",
    },
    
    // Add more payment data here as needed
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedPayments = [...payments];
    updatedPayments[index].status = newStatus;
    setPayments(updatedPayments);
  };

  return (
   <>
    <h2 className="mb-0 text-center bg-dark text-white py-2 mt-5 mb-2">
    Payment Board
  </h2>
    <div className="container-fluid mt-5 fs-6">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Lead Id</th>
            <th>Payment Date</th>
            <th>Client Name</th>
            <th>Mobile</th>
            <th>Lead Owner</th>
            <th>Manager</th>
            <th>PAN No</th>
            <th>Segment</th>
            <th>Bank</th>
            <th>Total</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>DOB</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="fw-normal">
          {payments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.leadId}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.clientName}</td>
              <td>{payment.mobile}</td>
              <td>{payment.leadOwner}</td>
              <td>{payment.manager}</td>
              <td>{payment.panNo}</td>
              <td>{payment.segment}</td>
              <td>{payment.bank}</td>
              <td>{payment.total}</td>
              <td>{payment.email}</td>
              <td>{payment.city}</td>
              <td>{payment.state}</td>
              <td>{payment.dob}</td>
              <td>
              <div className="d-flex flex-column gap-2">
              <button
                  className="btn btn-success btn-sm mr-1 py-0 px-2"
                  onClick={() => handleStatusChange(index, "Completed")}
                >
                  Status
                </button>
                <EditButton className="btn btn-primary btn-sm mr-1 py-0 px-2" />
                <DeleteButton className="btn btn-danger btn-sm mr-1  py-0 px-2 "/>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

         {/* Pagination and Summary */}
         <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Showing <strong>1 to 10</strong> of <strong>3,445</strong> entries
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
        {/* Summary */}
        <div className=" mb-0 ">
          <PrintButton tableId="payment-table1"/>
          <PdfButton tableId="payment-table1" />
          <CsvButton tableId="payment-table1" />
          <CopyButton tableId="payment-table1" />
        </div>
        <div className="mt-2">
          <table className="table table-bordered" id="payment-table1">
            <thead className="table-secondary">
              <tr>
                <th>Date Range</th>
                <th>Branch</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All</td>
                <td></td>
                <td>3190806</td>
              </tr>
            </tbody>
          </table>
        </div>
 {/* Pagination and Summary */}
 <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Showing <strong>1 to 10</strong> of <strong>3,445</strong> entries
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
           
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div> 

        {/* Summary */}
        <div className=" mb-0">
          <PrintButton tableId="payment-table2"/>
          <PdfButton tableId="payment-table2" />
          <CsvButton tableId="payment-table2" />
          <CopyButton tableId="payment-table2" />
        </div>
        <div className="mt-2">
          <table className="table table-bordered" id="payment-table2">
            <thead className="table-secondary">
              <tr>
                <th>Date Range</th>
                <th>Total Number Of Payment</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All</td>
                <td>152</td>      
                <td>3190806</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination and Summary */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Showing <strong>1 to 10</strong> of <strong>3,445</strong> entries
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
             
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div> 

         {/* Summary */}
         <div className=" mb-0">
          <PrintButton tableId="payment-table3"/>
          <PdfButton tableId="payment-table3" />
          <CsvButton tableId="payment-table3" />
          <CopyButton tableId="payment-table3" />
        </div>
        <div className="mt-2">
          <table className="table table-bordered" id="payment-table3">
            <thead className="table-secondary">
              <tr>
                <th>Branch Name</th>
                <th>Target</th>
                <th>Gross Amount</th>
                <th>Net Amount</th>
                <th>Remaining</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>1</td>
                <td>4287223</td>
                <td>3572685.83</td>
                <td>-4287222</td>
                <td>428722300%</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination and Summary */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Showing <strong>1 to 10</strong> of <strong>3,445</strong> entries
          </div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item">
                <button className="page-link">Previous</button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div> 
    </div>  
   </>
  );
};

export default Payment;
