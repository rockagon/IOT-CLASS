var express = require('express'),
router = express.Router(),

resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.actuators);
});
router.route('/description').get(function (req, res, next) {
    res.send(resources.pi.actuators.description);
});

router.route('/leds').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds);
});

router.route('/leds/led1').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led1);
    });

router.route('/leds/led1/value').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led1.value);
});
router.route('/leds/led1/name').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led1.name);
});

router.route('leds/led2').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led2);
    });

router.route('/leds/led2/value').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led2.value);
});
router.route('/leds/led2/name').get(function (req, res, next) {
    res.send(resources.pi.actuators.leds.led2.name);
});


module.exports = router;