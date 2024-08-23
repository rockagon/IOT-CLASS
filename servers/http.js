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

// API Routes
app.use('/pi', piRoutes);
app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorsRoutes);

// HATAOS Example Route (if needed)
app.get('/api', (req, res) => {
    res.json({
        _links: {
            'self': { 'href': '/api' },
            'pi': { 'href': '/pi' },
            'actuators': { 'href': '/pi/actuators' },
            'sensors': { 'href': '/pi/sensors' }
        }
    });
});

app.listen(8888, function () {
    console.log('Server is running on port 8888');
});

module.exports = app;