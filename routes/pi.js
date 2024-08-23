var express = require('express');
var router = express.Router();
var resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>${resources.pi.name}</h1>
                <p>${resources.pi.description}</p>
                <ul>
                    <li><a href="/pi/sensors">Sensors</a></li>
                    <li><a href="/pi/actuators">Actuators</a></li>
                </ul>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi);
    }
});

router.route('/sensors').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>Sensors</h1>
                <ul>
                    <li><a href="/pi/sensors/pir">PIR Sensor</a></li>
                    <li><a href="/pi/sensors/ldr">LDR Sensor</a></li>
                    <li><a href="/pi/sensors/dht22">DHT22 Sensor</a></li>
                </ul>
                <a href="/pi">Back to Home</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.sensors);
    }
});

router.route('/sensors/pir').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>PIR Sensor</h1>
                <p>Name: ${resources.pi.sensors.pir.name}</p>
                <p>Description: ${resources.pi.sensors.pir.description}</p>
                <p>Status: ${resources.pi.sensors.pir.value}</p>
                <a href="/pi/sensors">Back to Sensors</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.sensors.pir);
    }
});

router.route('/sensors/ldr').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>LDR Sensor</h1>
                <p>Name: ${resources.pi.sensors.ldr.name}</p>
                <p>Description: ${resources.pi.sensors.ldr.description}</p>
                <p>Status: ${resources.pi.sensors.ldr.value}</p>
                <a href="/pi/sensors">Back to Sensors</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.sensors.ldr);
    }
});

router.route('/sensors/dht22').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>DHT22 Sensor</h1>
                <p>Name: ${resources.pi.sensors.dht22.name}</p>
                <p>Description: ${resources.pi.sensors.dht22.description}</p>
                <p>Temperature: ${resources.pi.sensors.dht22.temperature.value}</p>
                <p>Humidity: ${resources.pi.sensors.dht22.humidity.value}</p>
                <a href="/pi/sensors">Back to Sensors</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.sensors.dht22);
    }
});


router.route('/actuators/ledldr').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>LDR Light</h1>
                <p>Name: ${resources.pi.actuators.ledldr.name}</p>
                <p>Description: ${resources.pi.actuators.ledldr.description}</p>
                <p>Status: ${resources.pi.actuators.ledldr.value}</p>
                <a href="/pi/actuators">Back to Actuators</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.actuators.ledldr);
    }
});


router.route('/actuators/ledpir').get(function (req, res, next) {
    const accept = req.headers.accept || 'application/json';

    if (accept.includes('text/html')) {
        res.send(`
            <html>
            <body>
                <h1>PIR Light</h1>
                <p>Name: ${resources.pi.actuators.ledpir.name}</p>
                <p>Description: ${resources.pi.actuators.ledpir.description}</p>
                <p>Status: ${resources.pi.actuators.ledpir.value}</p>
                <a href="/pi/actuators">Back to Actuators</a>
            </body>
            </html>
        `);
    } else {
        res.json(resources.pi.actuators.ledpir);
    }
});

module.exports = router;