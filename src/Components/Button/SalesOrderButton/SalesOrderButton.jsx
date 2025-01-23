import React from 'react'

const handleSo = ()=>{
    console.log("this is handle PR");
}

export const SalesOrderButton =({
    onClick = handleSo,
    className = "SO-btn btn-sm px-1 py-0"
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
       SO
    </button>
   )
}