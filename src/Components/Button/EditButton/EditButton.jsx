import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
const handleEdit = () => {
  console.log("this is handle Edit");
  alert("Edit Succesfully");
};
export const EditButton = ({
  onClick = handleEdit,

  // className = " px-0 py-0 m-0  d-print-none ",
}) => {
  return (
  //   <button onClick={onClick} className="btn text-white py-1 px-1  d-print-none rounded-0" style={{
  //     fontWeight: "600",
  //     // borderRadius: "0",
  //     backgroundColor: "#009688",
  //     fontSize: "12px",
  //     //   border: "1px solid grey",
  //     //   color : "white"
  //   }}>
  //  <BsFillPencilFill className="fs-6" />
  //   </button>

<button onClick={onClick} className="btn btn-teal d-flex align-items-center text-white justify-content-center rounded-1" 
style={{ width: "25px", height: "25px" , fontSize:"12px", backgroundColor: "#009688",}}>
  <i className="fas fa-pencil-alt "></i>
  </button>


  );
};
                              // className="btn btn-primary btn-sm mr-1 py-0 px-2"
