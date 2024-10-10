import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../CSS/TripListPage.css'; // Import the CSS for styling

const TripListPage = () => {
    const [trips, setTrips] = useState([]); // State to hold the fetched trips
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to handle errors
    const [selectedTrips, setSelectedTrips] = useState([]); // State to track selected trips
    const [selectAll, setSelectAll] = useState(false); // State to track "Select All" checkbox

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0); // Current page
    const tripsPerPage = 10; // Number of trips to display per page

    const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

    // Fetch trip data from the API
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/trip-data');
                setTrips(response.data); // Store fetched data in state
                setLoading(false); // Set loading to false when data is fetched
            } catch (err) {
                setError('Error fetching trip data');
                setLoading(false);
            }
        };

        fetchTrips(); // Trigger data fetching on component mount
    }, []);

    // Handle checkbox toggle
    const handleCheckboxChange = (tripId) => {
        setSelectedTrips((prevSelectedTrips) => {
            if (prevSelectedTrips.includes(tripId)) {
                return prevSelectedTrips.filter((id) => id !== tripId); // Deselect if already selected
            } else {
                return [...prevSelectedTrips, tripId]; // Select new trip
            }
        });
    };

    // Handle "Select All" toggle
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedTrips([]); // Deselect all
        } else {
            const allTripIds = trips.map((trip) => trip.id); // Select all trips
            setSelectedTrips(allTripIds);
        }
        setSelectAll(!selectAll);
    };

    // Handle delete operation
    const handleDelete = async () => {
        try {
            await axios.post('http://localhost:5000/api/delete-trips', { ids: selectedTrips });
            setTrips((prevTrips) => prevTrips.filter((trip) => !selectedTrips.includes(trip.id)));
            setSelectedTrips([]); // Clear selected trips after deletion
            setSelectAll(false); // Reset select all
        } catch (error) {
            console.error('Error deleting trips:', error);
        }
    };

    // Function to get the location name based on latitude and longitude
    const getLocationName = (latitude, longitude) => {
        const isInRange = (value, target, range) => Math.abs(value - target) < range;

        // Sample locations with latitude/longitude ranges
        if (isInRange(latitude, 52.5051, 0.1) && isInRange(longitude, 13.3363, 0.1)) {
            return 'Berlin';
        } else if (isInRange(latitude, 12.9716, 0.1) && isInRange(longitude, 77.5946, 0.1)) {
            return 'Bangalore';
        } else if (isInRange(latitude, 40.7128, 0.1) && isInRange(longitude, -74.0060, 0.1)) {
            return 'New York City';
        }

        return 'Unknown location';
    };

    // Logic for pagination
    const displayedTrips = trips.slice(currentPage * tripsPerPage, (currentPage + 1) * tripsPerPage);
    const hasMoreTrips = (currentPage + 1) * tripsPerPage < trips.length;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Handle Open button click
    const handleOpen = () => {
        if (selectedTrips.length > 0) {
            // Navigate to MegaPage, passing selectedTrips as state if needed
            navigate('/MegaPage', { state: { selectedTrips } });
        } else {
            alert('Please select at least one trip to open');
        }
    };

    return (
        <div className="trip-list-container">
            <div className="header">
                <h1>Trips</h1>
                <div className="actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleDelete} disabled={selectedTrips.length === 0} style={{ marginRight: '10px' }}>
                        Delete
                    </button>
                    <button onClick={handleOpen}>
                        Open
                    </button>
                </div>
            </div>

            {displayedTrips.length > 0 ? (
                <>
                    <table className="trip-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th style={{ textAlign: 'left' }}>Latitude</th>
                                <th style={{ textAlign: 'left' }}>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedTrips.map((trip) => {
                                return (
                                    <tr key={trip.id}>
                                        <td style={{ textAlign: 'left' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedTrips.includes(trip.id)}
                                                onChange={() => handleCheckboxChange(trip.id)}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'left' }}>{trip.latitude}</td>
                                        <td style={{ textAlign: 'left' }}>
                                            {getLocationName(trip.latitude, trip.longitude)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        {hasMoreTrips && (
                            <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                                Load More
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <p>No trips found</p>
            )}
        </div>
    );
};

export default TripListPage;
