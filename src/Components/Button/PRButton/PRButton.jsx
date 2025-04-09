import React from 'react'

const handlePR = ()=>{
    console.log("this is handle PR");
}

export const PRButton =({
    onClick = handlePR,
    className = "PR-btn btn-sm px-1  "
})=>{
   return(
    <button onClick={onClick} className={className} style={{
        fontWeight: "500",
        borderRadius: "0",
        backgroundColor: "#31493C",
        fontSize: "12px",
        border: "1px solid grey",
        color : "white"
      }}>
       PR
    </button>
   )
}