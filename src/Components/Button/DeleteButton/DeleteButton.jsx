import React from 'react'

const handleDelete = ()=>{
    console.log("this is delete button");
    alert('Delete Succesfully');
}

export const DeleteButton = ({
    onClick= handleDelete,
    className = "btn btn-danger p-0  w-25 m-0 btn-sm d-print-none"
})=>{
  return(
    <button onClick={onClick} className={className}>
     Delete
    </button>
  )
}