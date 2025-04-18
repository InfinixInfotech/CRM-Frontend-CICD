import React from "react";

const handleStatus = () => {
  console.log("This is handleStatus");
};

export const StatusButton = ({
  onClick = handleStatus,
  className = "Status-btn btn-sm px-1  ",
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        fontWeight: "500",
        borderRadius: "0",
        backgroundColor: "#ED9C28",
        fontSize: "12px",
        border: "1px solid grey",
        color: "white",
      }}
      
    >
      Status
    </button>
  );
};
