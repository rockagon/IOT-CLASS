var express = require('express'),
router = express.Router(),

resources = require('../resources/resources.json');

router.route('/').get(function (req, res, next) {
    res.send('WELCOME TO WOT LAB2');
})
router.route('/pi').get(function (req, res, next) {
    res.send(resources.pi);
})
router.route('/pi/name').get(function (req, res, next) {
    res.send(resources.pi.name);
})
router.route('/pi/description').get(function (req, res, next) {
    res.send(resources.pi.description);
})
router.route('/pi/port').get(function (req, res, next) {
    res.send(resources.pi.port);
})
module.exports = router;