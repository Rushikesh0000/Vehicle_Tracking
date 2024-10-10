// UploadPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/UploadPage.css'; // Make sure your CSS is linked

const UploadPage = () => {
    const [tripName, setTripName] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // To navigate between pages

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('tripFile', file);
        formData.append('tripName', tripName);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
            navigate('/triplist'); // Navigate to TripListPage.js after saving
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleCancel = () => {
        navigate('/welcome'); // Navigate back to WelcomePage on cancel
    };

    return (
        <div className="upload-page">
            <h1>Upload Trip Data</h1>
            <table className="center-table">
                <tbody>
                    <tr>
                        <td colSpan="4">
                            <input
                                type="text"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                placeholder="Enter Trip Name"
                                className="input-field"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <input type="file" onChange={handleFileChange} className="file-input" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button onClick={handleSave} className="save-button">Save</button>
                        </td>
                        <td colSpan="2">
                            <button onClick={handleCancel} className="cancel-button">Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UploadPage;
