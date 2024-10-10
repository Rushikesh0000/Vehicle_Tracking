module.exports = app => {
    const gpsdata = require("../controllers/gpsdata.controller.js");
  
    const router = require("express").Router();
  
    // Create new GPS data
    router.post("/", gpsdata.create);
  
    // Retrieve all GPS data for a trip
    router.get("/:tripId", gpsdata.findAll);
  
    app.use('/api/gpsdata', router);
  };
  