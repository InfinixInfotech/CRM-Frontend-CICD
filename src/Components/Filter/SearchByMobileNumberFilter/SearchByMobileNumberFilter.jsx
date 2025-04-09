import React, { useEffect, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");

  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSearchClick = () => {
    setShowModal(true);
  };
  const handleShow = () => setTableShowModal(true);
  const handleClose = () => setTableShowModal(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setErrorMessage("Please enter a mobile number or Lead ID.");
      return;
    }
  
    setErrorMessage(""); // Clear previous error
    console.log("Searching for:", inputValue);
  
    const payload = {
      employeeCode: emp,
      data: inputValue,
    };
  
    dispatch(GetLeadByMobileOrLeadIdThunk(payload))
      .then((response) => {
        console.log("Full API Response:", response);
  
        if (response && response.payload && response.payload.lead) {
          setSearchData(response.payload.lead);
          console.log("Lead Data:", response.payload.lead);
        } else {
          setErrorMessage("No lead data found in the response.");
          setSearchData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("An error occurred while fetching data. Please try again later.");
      })
      .finally(() => {
        setTimeout(() => {
          setShowModal(false);
          setInputValue("");  // Clear input field after search
          setErrorMessage("");
          setSearchData([]);
        }, 100);
      });
  };
  

  useEffect(() => {
    if (SearchData && Object.keys(SearchData).length > 0) {
      Navigate(`/tablesearch`, { state: { SearchData } });
    }
  }, [SearchData]);

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
          {errorMessage && (
            <div className="text-danger mb-2">{errorMessage}</div>
          )}
          <input
            type="text"
            className="form-control input-box"
            placeholder="Enter a Lead Id / Mobile Number"
            value={inputValue}
            onKeyDown={handleKeyDown}
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
    </>
    
  );
};

export default SearchByMobileNumberFilter;
