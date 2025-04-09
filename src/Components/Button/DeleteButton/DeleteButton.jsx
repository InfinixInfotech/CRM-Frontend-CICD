import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsFillTrashFill } from "react-icons/bs";

const Delete = ({ id, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const handleDeleteClick = () => {
        setShowModal(true);
    };
    const handleConfirmDelete = () => {
        onDelete(id);
        setShowModal(false);
    };
    return (
        <>
            {/* <button onClick={handleDeleteClick}    className="btn btn-danger   py-1 rounded-0 px-1"

            
         style={{
            fontWeight: "600",
            // borderRadius: "0",
            // backgroundColor: "#D2322D",
            fontSize: "12px",
            // border: "1px solid grey",
            // color : "white"
          }}>
              <BsFillTrashFill className="fs-6" />
            </button> */}

            <button  onClick={handleDeleteClick} className=" btn-secondary d-flex align-items-center justify-content-center px-1" 
            style={{ width: "22px", height: "22px" , fontSize:"11px" }}>
                <i className="fas fa-trash " ></i>
            </button>


            {/* Bootstrap Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Delete;