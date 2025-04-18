import React from 'react'

const handleDispose = ()=>{
    console.log("this is Dispose button");
}

export const DisposeButton = ({
    onClick= handleDispose,
    className = "Dispose-btn btn-sm px-2 py-0 rounded-1"
})=>{
  return(
    <button onClick={onClick} className={className} style={{
      fontWeight: "600",
      borderRadius: "0",
      backgroundColor: "#758694",
      fontSize: "12px",
      border: "1px solid grey",
      color : "white"
    }}>
        Dispose
    </button>
  )
}