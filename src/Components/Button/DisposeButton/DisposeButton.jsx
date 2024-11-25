import React from 'react'

const handleDispose = ()=>{
    console.log("this is Dispose button");
}

export const DisposeButton = ({
    onClick= handleDispose,
    className = "Dispose-btn"
})=>{
  return(
    <button onClick={onClick} className={className}>
        Dispose
    </button>
  )
}