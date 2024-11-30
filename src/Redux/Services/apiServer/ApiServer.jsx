import React from 'react';
const isLive = true;
const envUrl = import.meta.env.VITE_API_URL;
const apiUrl = isLive ? envUrl : '';
  

export const postLeadStatusUrl = `${apiUrl}/api/LeadStatus/InsertLeadStatus`;
export const getAllLeadStatusUrl = `${apiUrl}/api/LeadStatus/GetAllLeadStatus`;
export const staticToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NTg5MmJlNy1mN2RiLTRhMzQtYTgzYS1jYzZjYTI5ZWQ3MTEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImlhdCI6MTczMjk2MjM5NiwiSXNBZG1pbiI6InRydWUiLCJleHAiOjE3NjQ0OTgzOTYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODIvIn0.MCFkSYkAfpTelbfVnFUtUQrDZ-Hkj8ROkaTJyfY-P_0`

export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
