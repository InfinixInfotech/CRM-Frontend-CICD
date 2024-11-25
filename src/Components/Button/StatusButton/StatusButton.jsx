import React from 'react'

const handleStatus = ()=>{
    console.log("This is handleStatus"); 
}

export const StatusButton = ({
    onClick = handleStatus,
    className = "Status-btn"
})=>{
  return(
    <button onClick={onClick} className={className}>
        Status
    </button>
  )
}