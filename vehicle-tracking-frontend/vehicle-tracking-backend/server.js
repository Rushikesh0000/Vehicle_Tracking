// server.js

import express from 'express'; // Change require to import
import multer from 'multer'; // Change require to import
import cors from 'cors'; // Change require to import
import bodyParser from 'body-parser'; // Change require to import
import fs from 'fs'; // Change require to import
import csv from 'csv-parser'; // Change require to import
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' }); // Set the directory for uploaded files

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vehicle_tracking',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Endpoint to handle file uploads and data storage
app.post('/api/upload', upload.single('tripFile'), (req, res) => {
    const tripName = req.body.tripName;
    const filePath = req.file.path;

    // Parse CSV file and insert data into database
    const tripData = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            tripData.push(row);
        })
        .on('end', () => {
            // Insert each row into the database
            tripData.forEach((data) => {
                const sql = 'INSERT INTO trips (trip_name, latitude, longitude, timestamp, ignition) VALUES (?, ?, ?, NOW(), ?)'; // Adjust column names as needed
                db.query(sql, [tripName, data.latitude, data.longitude, data.ignition], (error, results) => {
                    if (error) throw error;
                });
            });
            fs.unlinkSync(filePath); // Remove the file after processing
            res.json({ message: 'File uploaded and data saved successfully' });
        })
        .on('error', (error) => {
            console.error('Error reading CSV file:', error);
            res.status(500).json({ message: 'Failed to process CSV file' });
        });
});

// Endpoint to delete selected trips
app.post('/api/delete-trips', (req, res) => {
    const { ids } = req.body; // Expecting an array of trip IDs
    const sql = 'DELETE FROM trips WHERE id IN (?)'; // Adjust to your table's structure
    db.query(sql, [ids], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to delete trips' });
        }
        res.json({ message: 'Trips deleted successfully' });
    });
});

// Endpoint to fetch trip data
app.get('/api/trip-data', (req, res) => {
    const sql = 'SELECT * FROM trips'; // Adjust to your table structure
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results); // Send the trip data as a response
    });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
