var express = require('express'),
router = express.Router(),

resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    res.send(resources.pi.actuators);
});
router.route('/ledpir').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledpir);
});

router.route('/ledpir.name').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledpir.name);
});

router.route('/ledpir.value').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledpir.value);
});

router.route('/ledldr').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledldr);
});

router.route('/ledldr.name').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledldr.name);
});

router.route('/ledldr.value').get(function (req, res, next) {
    res.send(resources.pi.actuators.ledldr.value);
});


module.exports = router;
