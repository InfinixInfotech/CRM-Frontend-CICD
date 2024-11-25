import React from "react";

const handleEdit = () => {
  console.log("this is handle Edit");
  alert('Edit Succesfully');
};
export const EditButton = ({
  
  onClick = handleEdit,
  
  className = "btn btn-primary  p-0  w-25 m-0 btn-sm d-print-none ",
}) => {
  return (
    <button onClick={onClick} className={className} >
      Edit 
    </button>
  );
};
