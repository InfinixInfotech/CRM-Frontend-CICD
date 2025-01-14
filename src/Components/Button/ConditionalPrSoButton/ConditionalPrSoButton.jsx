import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ConditionalPrSoButton({ isPrGenerated, onClick }) {
  return (
    <button
      className={`btn ${isPrGenerated === 0 ? 'btn-secondary' : 'btn-danger'}`}
      style={{
        padding: 0,
        margin: 0,
        fontSize: "12px",
        color: "white",
        border: "1px solid grey",
        fontWeight: "600",
        borderRadius: "0",
      }}
      onClick={onClick} // Pass the onClick prop here
    >
      {isPrGenerated === 0 ? 'PR' : 'SO'}
    </button>
  );
}

export default ConditionalPrSoButton;