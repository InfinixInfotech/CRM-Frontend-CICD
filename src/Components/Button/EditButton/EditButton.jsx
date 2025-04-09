import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
const handleEdit = () => {
  console.log("this is handle Edit");
  alert("Edit Succesfully");
};
export const EditButton = ({
  onClick = handleEdit,

}) => {
  return (

<button onClick={onClick} className="btn btn-sm py-0 d-flex align-items-center text-white justify-content-center " 
style={{ width: "22px", height: "22px" , fontSize:"11px", backgroundColor: "#2c3e50",}}>
  <i className="fas fa-pencil-alt "></i>
  </button>


  );
};

