import React from 'react'

const handleSend = ()=>{
   console.log("this is handle Send");
   
}
export const SendButton = ({
    onClick = handleSend ,
    className = "Send-btn"
})=>{
   return(
    <button onClick={onClick} className={className}>
       Send
    </button>
   )
}