import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetLeadByMobileOrLeadIdThunk } from "../../../Redux/Services/thunks/GetLeadByMobileOrLeadIdThunk";
import { emp } from "../../../Redux/Services/apiServer/ApiServer";
import { useNavigate } from "react-router-dom";

const SearchByMobileNumberFilter = () => {
  const [showModal, setShowModal] = useState(false);
  const [TableshowModal, setTableShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const Navigate = useNavigate();
 
  const dispatch = useDispatch();
  // console.log("Search data ->" +SearchData)
  const handleSearchClick = () => {
    setShowModal(true);
  };
  const handleShow = () => setTableShowModal(true);
  const handleClose = () => setTableShowModal(false);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert("Please enter a mobile number or Lead ID.");
      return;
    }
    const payload = {
      employeeCode: emp,
      data: inputValue,
    };
    dispatch(GetLeadByMobileOrLeadIdThunk(payload))
      .then((response) => {
        console.log("Full API Response:", response);
        console.log("Full API Response:",JSON.stringify(response.payload.lead));
        if (response && response.payload && response.payload.lead) {
          setSearchData(response.payload.lead);
          console.log("SearchDataSender----------------",SearchData);
          console.log("Lead Data:", response.payload.lead);
        } else {
          alert("No lead data found in the response.");
          setSearchData({});
        }
        Navigate(`/tablesearch`, { state: { SearchData } });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("An error occurred while fetching data. Please try again later.");
      });
  };
  

  return (
    <>
      <button
        onClick={handleSearchClick}
        className="btn btn-sm text-white"
        style={{ fontSize: "20px" }}
      >
        <i class="bi bi-search"></i>
      </button>

      {/* Bootstrap Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a Lead Id / Mobile Number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSearch}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Button variant="primary" onClick={handleShow}>
        Show Table
      </Button>

      <Modal show={TableshowModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Table in Pop-Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Client Name</th>
                <th>Mobile</th>
                <th>Assigned To</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {SearchData && Object.keys(SearchData).length > 0 ? (
                <tr>
                  <td>{SearchData.id}</td>
                  <td>{SearchData.clientName}</td>
                  <td>{SearchData.mobile}</td>
                  <td>{SearchData.assignedTo}</td>
                  <td>{SearchData.leadSource || "N/A"}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default SearchByMobileNumberFilter;
