import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from "react-icons/fi";
export default function BackButton({ to }) {
    const navigate = useNavigate();

    const handleBack = () => {
        // If `to` prop is provided, navigate to that route. Otherwise, go back to the previous page.
        if (to) {
            navigate(to);
        } else {
            window.history.back(); // Go back to the previous page if no 'to' prop is provided
        }
    };

    return (
        <button 
            type="button" 
            className="Csv-btn mt-3 px-2 py-0  no-print" 
            style={{ borderRadius: "none", backgroundColor:"none"}} 
            onClick={handleBack}
        >
            <FiArrowLeftCircle className='fs-2 text-primary' />
        </button>
    );
}
