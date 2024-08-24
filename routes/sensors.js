var express = require('express');
var router = express.Router();
var resources = require('../resources/resources.json');


// Base URL for HATAOS links
const baseUrl = 'http://localhost:8888/pi/sensors';


// Function to send HTML response
function sendHtmlResponse(res, data) {
    let html = '<html><body>';
    html += `<h1>${data.name}</h1>`;
    html += `<p>Description: ${data.description}</p>`;
    html += `<p>Value: ${data.value}</p>`;
    html += `<p><a href="${baseUrl}">Back to sensors</a></p>`;
    html += '</body></html>';
    res.send(html); // Missing line in original code
}


// Route to get all sensors
router.route('/').get(function (req, res, next) {
    if (req.accepts('html')) {
        res.send('<html><body><h1>Sensors</h1><p><a href="/pi/sensors/pir">PIR Sensor</a></p><p><a href="/pi/sensors/ldr">LDR Sensor</a></p><p><a href="/pi/sensors/dht22">DHT22 Sensor</a></p></body></html>');
    } else {
        res.json(resources.pi.sensors);
    }
});


// Route to get PIR sensor details
router.route('/pir').get(function (req, res, next) {
    const sensor = resources.pi.sensors.pir;
    if (req.accepts('html')) {
        sendHtmlResponse(res, sensor);
    } else {
        res.json(sensor);
    }
});


// Route to get LDR sensor details
router.route('/ldr').get(function (req, res, next) {
    const sensor = resources.pi.sensors.ldr;
    if (req.accepts('html')) {
        sendHtmlResponse(res, sensor);
    } else {
        res.json(sensor);
    }
});


// Route to get DHT22 sensor details
router.route('/dht22').get(function (req, res, next) {
    const sensor = resources.pi.sensors.dht22;
    if (req.accepts('html')) {
        sendHtmlResponse(res, sensor);
    } else {
        res.json(sensor);
    }
});

module.exports = router;







