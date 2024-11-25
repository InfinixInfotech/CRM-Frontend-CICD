import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/settingdashboard'); // Adjust the path to match your routing configuration
    };

    return (
        <button type="button" className="btn btn-secondary" onClick={handleBack}>
            Back to Dashboard
        </button>
    );
}
