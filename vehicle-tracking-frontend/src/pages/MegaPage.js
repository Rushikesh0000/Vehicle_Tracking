import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet's CSS
import '../CSS/MegaPage.css'; // You will create CSS to match the layout from the image

const MegaPage = () => {
    const location = useLocation();
    const { selectedTrips = [] } = location.state || {}; // Get selected trips from state

    // Simulating trip data (replace with actual data)
    const tripData = selectedTrips.map((tripId) => ({
        id: tripId,
        latitude: 40.7128, // Example lat
        longitude: -74.0060, // Example long
        speed: 28.5,
        ignition: "ON",
        duration: "20 mins",
        stopDuration: "10 mins",
        overspeedDuration: "20 mins",
    }));

    const polylinePositions = tripData.map(trip => [trip.latitude, trip.longitude]);

    return (
        <div className="mega-page-container">
            {/* Map Section */}
            <div className="map-container">
                <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {/* Polyline and Markers */}
                    <Polyline positions={polylinePositions} color="blue" />
                    {tripData.map((trip, index) => (
                        <Marker key={index} position={[trip.latitude, trip.longitude]} />
                    ))}
                </MapContainer>
            </div>

            {/* Summary Section */}
            <div className="summary-container">
                <div className="summary-card">
                    <h3>Total Distance Travelled</h3>
                    <p>63 KM</p>
                </div>
                <div className="summary-card">
                    <h3>Total Travelled Duration</h3>
                    <p>1Hr 36 Mins</p>
                </div>
                <div className="summary-card">
                    <h3>Overspeeding Duration</h3>
                    <p>41 Mins</p>
                </div>
                <div className="summary-card">
                    <h3>Overspeeding Distance</h3>
                    <p>20.3 KM</p>
                </div>
                <div className="summary-card">
                    <h3>Stopped Duration</h3>
                    <p>41 Mins</p>
                </div>
            </div>

            {/* Trip Details Table */}
            <div className="trip-details-table">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Point (Lat, Long)</th>
                            <th>Ignition</th>
                            <th>Speed</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tripData.map((trip, index) => (
                            <tr key={index}>
                                <td>11:30:24 PM to 11:30:24 PM</td>
                                <td>{`${trip.latitude} N, ${trip.longitude} W`}</td>
                                <td>{trip.ignition}</td>
                                <td>{trip.speed} KMPH</td>
                                <td>
                                    Travel Duration: {trip.duration} <br />
                                    Stopped for: {trip.stopDuration} <br />
                                    Overspeeding Duration: {trip.overspeedDuration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination - if necessary */}
            <div className="pagination-container">
                <button>&lt;</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>&gt;</button>
            </div>
        </div>
    );
};

export default MegaPage;
