var express = require('express');
var router = express.Router();
var resources = require('../resources/resources.json');

// Base URL for HATAOS links
const baseUrl = 'http://localhost:8888/pi/actuators';

// Function to send HTML response
function sendHtmlResponse(res, data) {
    let html = '<html><body>';
    html += `<h1>${data.name}</h1>`;
    html += `<p>Description: ${data.description}</p>`;
    html += `<p>Value: ${data.value}</p>`;
    html += `<p><a href="${baseUrl}">Back to actuators</a></p>`;
    html += '</body></html>';
}

// Route to get all actuators
router.route('/').get(function (req, res, next) {
    if (req.accepts('html')) {
        res.send('<html><body><h1>Actuators</h1><p><a href="/pi/actuators/ledpir">PIR Actuator</a></p><p><a href="/pi/actuators/ledldr">LDR Actuator</a></p></body></html>');
    } else {
        res.send({
            ...resources.pi.actuators,
            _links: {
                'self': { 'href': `${baseUrl}` },
                'ledpir': { 'href': `${baseUrl}/ledpir` },
                'ledldr': { 'href': `${baseUrl}/ledldr` }
            }
        });
    }
});

// Route to get LED PIR actuator details
router.route('/ledpir').get(function (req, res, next) {
    const actuator = resources.pi.actuators.ledpir;
    if (req.accepts('html')) {
        sendHtmlResponse(res, actuator);
    } else {
        res.send({
            ...actuator,
            _links: {
                'self': { 'href': `${baseUrl}/ledpir` },
                'name': { 'href': `${baseUrl}/ledpir/name` },
                'description': { 'href': `${baseUrl}/ledpir/description` },
                'value': { 'href': `${baseUrl}/ledpir/value` }
            }
        });
    }
});

// Route to get LED LDR actuator details
router.route('/ledldr').get(function (req, res, next) {
    const actuator = resources.pi.actuators.ledldr;
    if (req.accepts('html')) {
        sendHtmlResponse(res, actuator);
    } else {
        res.send({
            ...actuator,
            _links: {
                'self': { 'href': `${baseUrl}/ledldr` },
                'name': { 'href': `${baseUrl}/ledldr/name` },
                'description': { 'href': `${baseUrl}/ledldr/description` },
                'value': { 'href': `${baseUrl}/ledldr/value` }
            }
        });
    }
});

module.exports = router;
