import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import "./AlertBox.css"

export default function AlertBox({ variant, message, onConfirm, onCancel }) {


  const [showAlert, setShowAlert] = useState(true); // State to control visibility

  const handleConfirm = () => {
    setShowAlert(false); 
    onConfirm(); 
  };
  return (
    <div className="alert-container">
      <Alert variant={variant} dismissible onClose={onCancel}>
        <p>{message}</p>
        <div className="d-flex justify-content-end">
          <Button variant="success" size="sm" onClick={onConfirm} className="me-2">
            Confirm
          </Button>
          <Button variant="danger" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Alert>
    </div>
  );
}
