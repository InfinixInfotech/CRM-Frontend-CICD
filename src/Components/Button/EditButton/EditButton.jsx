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

<button onClick={onClick} className="btn btn-sm py-0 d-flex align-items-center text-white justify-content-center rounded-1" 
style={{ width: "25px", height: "25px" , fontSize:"12px", backgroundColor: "#009688",}}>
  <i className="fas fa-pencil-alt "></i>
  </button>


  );
};

