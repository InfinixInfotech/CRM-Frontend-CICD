import React from 'react'

const handlePR = ()=>{
    console.log("this is handle PR");
}

export const PRButton =({
    onClick = handlePR,
    className = "PR-btn"
})=>{
   return(
    <button onClick={onClick} className={className}>
       PR
    </button>
   )
}