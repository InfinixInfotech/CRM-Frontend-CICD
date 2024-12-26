import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";



function ConditionalPrSoButton({ isPrGenerated }) {
  const Navigate =useNavigate();

const handleNavigate=()=>{
  Navigate("/paymnetRaise")
  alert("button clicked")
 }
  return (
    <button
      className={`btn ${isPrGenerated === 0 ? 'btn-secondary' : 'btn-danger'}`}
      onClick={handleNavigate}
      style={{ padding: 0, margin: 0, fontSize:"12px",color : "white" ,border: "1px solid grey",fontWeight: "600",borderRadius: "0",}}
    >
      {isPrGenerated === 0 ? 'PR' : 'SO'}
      
    </button>
  );
}

export default ConditionalPrSoButton;
