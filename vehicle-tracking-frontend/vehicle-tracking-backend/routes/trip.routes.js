module.exports = app => {
    const trips = require("../controllers/trip.controller.js");
  
    const router = require("express").Router();
  
    // Create a new trip
    router.post("/", trips.create);
  
    // Retrieve all trips
    router.get("/", trips.findAll);
  
    app.use('/api/trips', router);
  };
  