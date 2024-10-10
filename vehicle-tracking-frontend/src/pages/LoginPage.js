import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Loginpage.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Reset error message
        setErrorMessage('');

        // Basic validation
        if (username === '') {
            setErrorMessage('Username is required');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }

        // Simple hardcoded validation for demo purposes
        if (username === 'user' && password === 'pass12345') { // Update password for demonstration
            navigate('/welcome'); // Adjusted to match the route for Welcome Page
        } else {
            setErrorMessage('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Speedo</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    aria-label="Username" // Accessibility improvement
                />
                <input
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    aria-label="Password" // Accessibility improvement
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={handleLogin} className="login-button">Sign In</button>
            </div>
        </div>
    );
};

export default LoginPage;
