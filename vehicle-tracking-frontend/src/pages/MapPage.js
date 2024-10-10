import React from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/MegaPage.css'; // Assuming you have a CSS file for styling

const MegaPage = () => {
    const location = useLocation();
    const { selectedTrips } = location.state || { selectedTrips: [] };

    // Dummy location data based on trip ID
    const tripData = {
        1: { name: 'Colaba', distance: '63 KM', time: '1Hr 36Mins', stopped: '41 Mins', overSpeed: '20.3 KM' },
        2: { name: 'Marine Drive', distance: '45 KM', time: '1Hr 15Mins', stopped: '25 Mins', overSpeed: '15 KM' },
        3: { name: 'Bandra', distance: '40 KM', time: '1Hr 10Mins', stopped: '30 Mins', overSpeed: '12 KM' }
        // Add more as needed
    };

    return (
        <div className="mega-page-container">
            <header className="mega-header">
                <h1>Trip Overview</h1>
            </header>
            
            <div className="trip-info-box">
                {selectedTrips.length > 0 ? (
                    selectedTrips.map((tripId, index) => {
                        const trip = tripData[tripId] || { name: 'Unknown', distance: 'N/A', time: 'N/A', stopped: 'N/A', overSpeed: 'N/A' };
                        return (
                            <div key={index} className="trip-card">
                                <h2>{trip.name}</h2>
                                <p><strong>Distance:</strong> {trip.distance}</p>
                                <p><strong>Total Time:</strong> {trip.time}</p>
                                <p><strong>Stopped:</strong> {trip.stopped}</p>
                                <p><strong>Over Speed:</strong> {trip.overSpeed}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>No trips selected</p>
                )}
            </div>

            <div className="map-section">
                <iframe
                    title="Map View"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509094!2d144.9537363153176!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d61c0ef482db!2sVictoria%20Harbour!5e0!3m2!1sen!2sin!4v1631413002605!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default MegaPage;
