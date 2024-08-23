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
}

// Route to get all sensors
router.route('/').get(function (req, res, next) {
    if (req.accepts('html')) {
        res.send('<html><body><h1>Sensors</h1><p><a href="/pi/sensors/pir">PIR Sensor</a></p><p><a href="/pi/sensors/ldr">LDR Sensor</a></p><p><a href="/pi/sensors/dht22">DHT22 Sensor</a></p></body></html>');
    } else {
        res.send({
            ...resources.pi.sensors,
            _links: {
                'self': { 'href': `${baseUrl}` },
                'pir': { 'href': `${baseUrl}/pir` },
                'ldr': { 'href': `${baseUrl}/ldr` },
                'dht22': { 'href': `${baseUrl}/dht22` }
            }
        });
    }
});

// Route to get PIR sensor details
router.route('/pir').get(function (req, res, next) {
    const sensor = resources.pi.sensors.pir;
    if (req.accepts('html')) {
        sendHtmlResponse(res, sensor);
    } else {
        res.send({
            ...sensor,
            _links: {
                'self': { 'href': `${baseUrl}/pir` },
                'name': { 'href': `${baseUrl}/pir/name` },
                'description': { 'href': `${baseUrl}/pir/description` },
                'value': { 'href': `${baseUrl}/pir/value` }
            }
        });
    }
});

// Route to get LDR sensor details
router.route('/ldr').get(function (req, res, next) {
    const sensor = resources.pi.sensors.ldr;
    if (req.accepts('html')) {
        sendHtmlResponse(res, sensor);
    } else {
        res.send({
            ...sensor,
            _links: {
                'self': { 'href': `${baseUrl}/ldr` },
                'name': { 'href': `${baseUrl}/ldr/name` },
                'description': { 'href': `${baseUrl}/ldr/description` },
                'value': { 'href': `${baseUrl}/ldr/value` }
            }
        });
    }
});

// Route to get DHT22 sensor details
router.route('/dht22').get(function (req, res, next) {
    res.send({
        ...resources.pi.sensors.dht22,
        _links: {
            'self': { 'href': `${baseUrl}/dht22` },
            'temperature': { 'href': `${baseUrl}/dht22/temperature` },
            'humidity': { 'href': `${baseUrl}/dht22/humidity` }
        }
    });
});

// Route to get DHT22 temperature details
router.route('/dht22/temperature').get(function (req, res, next) {
    const temp = resources.pi.sensors.dht22.temperature;
    if (req.accepts('html')) {
        sendHtmlResponse(res, temp);
    } else {
        res.send({
            ...temp,
            _links: {
                'self': { 'href': `${baseUrl}/dht22/temperature` },
                'name': { 'href': `${baseUrl}/dht22/temperature/name` },
                'description': { 'href': `${baseUrl}/dht22/temperature/description` },
                'value': { 'href': `${baseUrl}/dht22/temperature/value` }
            }
        });
    }
});

// Route to get DHT22 humidity details
router.route('/dht22/humidity').get(function (req, res, next) {
    const humidity = resources.pi.sensors.dht22.humidity;
    if (req.accepts('html')) {
        sendHtmlResponse(res, humidity);
    } else {
        res.send({
            ...humidity,
            _links: {
                'self': { 'href': `${baseUrl}/dht22/humidity` },
                'name': { 'href': `${baseUrl}/dht22/humidity/name` },
                'description': { 'href': `${baseUrl}/dht22/humidity/description` },
                'value': { 'href': `${baseUrl}/dht22/humidity/value` }
            }
        });
    }
});

module.exports = router;