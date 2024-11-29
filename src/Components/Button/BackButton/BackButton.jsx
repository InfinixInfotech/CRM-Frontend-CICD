import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/settingdashboard'); // Adjust the path to match your routing configuration
    };

    return (
        <button type="button" className="Csv-btn  mt-3 px-2 py-0 text-white no-print" style={{borderRadius:"none"}} onClick={handleBack}>
        <i class="bi bi-arrow-left-short">Back</i> 
    </button>
    );
}
