var express = require('express'),
router = express.Router(),

resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.sensors);
});

router.route('/pirs').get(function (req, res, next) {
    res.send(resources.pi.sensors.pirs);
});

router.route('/pirs/pir1').get(function (req, res, next) {
    res.send(resources.pi.sensors.pirs.pir1);
});

router.route('/pirs/pir1/value').get(function (req, res, next) {
res.send(resources.pi.sensors.pirs.pir1.value);
});
router.route('/pirs/pir1/name').get(function (req, res, next) {
    res.send(resources.pi.sensors.pirs.pir1.name);
});
router.route('/pirs/pir1/description').get(function (req, res, next) {
    res.send(resources.pi.sensors.pirs.pir1.description);
});

module.exports = router;