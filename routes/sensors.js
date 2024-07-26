var express = require('express'),
router = express.Router(),

resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.sensors);
});

router.route('/pir').get(function (req, res, next) {
    res.send(resources.pi.sensors.pir);
});

router.route('/pir/value').get(function (req, res, next) {
res.send(resources.pi.sensors.pir.value);
});
router.route('/pir/name').get(function (req, res, next) {
    res.send(resources.pi.sensors.pir.name);
});
router.route('/pir/description').get(function (req, res, next) {
    res.send(resources.pi.sensors.pir.description);
});



router.route('/ldr').get(function (req, res, next) {
    res.send(resources.pi.sensors.ldr);
});

router.route('/ldr/value').get(function (req, res, next) {
res.send(resources.pi.sensors.ldr.value);
});
router.route('/ldr/name').get(function (req, res, next) {
    res.send(resources.pi.sensors.ldr.name);
});
router.route('/ldr/description').get(function (req, res, next) {
    res.send(resources.pi.sensors.ldr.description);
});



router.route('/dht22').get(function (req, res, next) {
    res.send(resources.pi.sensors.dht22);
});

router.route('/dht22/temperature').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.temperature);
});

router.route('/dht22/temperature/name').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.temperature.name);
});

router.route('/dht22/temperature/description').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.temperature.description);
});

router.route('/dht22/temperature/value').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.temperature.value);
});



router.route('/dht22/humidity').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.humidity);
});

router.route('/dht22/temperature/name').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.humidity.name);
});

router.route('/dht22/temperature/description').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.humidity.description);
});
router.route('/dht22/temperature/value').get(function (req, res, next) {
res.send(resources.pi.sensors.dht22.humidity.value);
});


module.exports = router;
