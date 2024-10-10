import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import UploadPage from './pages/UploadPage';
import TripListPage from './pages/TripListPage';
import MegaPage from './pages/MegaPage'; // Make sure you have this component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* Home route */}
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/triplist" element={<TripListPage />} /> {/* Trip List route */}
                <Route path="/MegaPage" element={<MegaPage />} /> {/* Add MegaPage route */}
            </Routes>
        </Router>
    );
}

export default App;
