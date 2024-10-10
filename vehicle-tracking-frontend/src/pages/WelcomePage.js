import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../CSS/WelcomePage.css'; // Corrected import path

const WelcomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleUploadClick = () => {
        navigate('/upload'); // Navigate to UploadPage
    };

    return (
        <div className="container">
            <div className="welcome">👋 Welcome, User</div>
            <div className="upload-section">
                <div>
                    <button 
                        onClick={handleUploadClick} 
                        aria-label="Upload Trip"
                        className="upload-button" // Optional: add a class for styling
                    >
                        Upload Trip
                    </button>
                    <p>
                        Upload the <a href="#" aria-label="CSV upload instructions">CSV</a> file of your trip
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
