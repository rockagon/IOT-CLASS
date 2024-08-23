
var express = require('express');
var path = require('path');
var cors = require('cors');
var resources = require('./../resources/resources.json');
var actuatorsRoutes = require('../routes/actuators');
var sensorsRoutes = require('../routes/sensors');
var piRoutes = require('../routes/pi');

var app = express();

// Middleware for CORS
app.use(cors());

// Serve static files (e.g., UI files)
app.use(express.static(path.join(__dirname, 'public')));

// Route for root URL
app.get('/', (req, res) => {
    res.send(`
        <h1>WELCOME TO THE CMU AFRICA IOT CLASS PROJECTS PORTAL</h1>
        <p><a href="/pi">Raspberry Pi based simple smart home</a></p>
    `);
});

// HATAOS 
app.get('/', (req, res) => {
    res.json(resources);
});

// API Routes
app.use('/pi', piRoutes);
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorsRoutes);

app.listen(8000, function () {
    console.log('Server is running on port 8000');
});

module.exports = app;
